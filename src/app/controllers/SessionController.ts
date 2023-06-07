import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import jsonWebTokenSettings from '../../config/auth';
import AbstractController from '../../core/AbstractController';

const prisma = new PrismaClient();

interface Session {
  email: string;
  password: string;
  agropecuarista?: {
    id: number;
  };
  fridge?: {
    id: number;
  };
  transportCompany?: {
    id: number;
  };
}

class SessionController extends AbstractController {
  public async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    });

    const error = await super.validateData(req, res, schema);

    if (Object.keys(error).length) {
      return res.status(400).json({ error });
    }

    const { email, password }: Session = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        passwordHash: true
      }
    });

    if (!user) {
      return res.status(404).json({
        error: {
          email: 'E-mail ou senha incorretos!'
        }
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.passwordHash);

    if (!verifyPassword) {
      return res.status(401).json({
        error: {
          email: 'E-mail ou senha incorretos!'
        }
      });
    }

    const { id } = user;

    const payload = { id };

    return res.status(200).json({
      user: {
        id,
        email
      },
      token: jwt.sign(payload, jsonWebTokenSettings.secret, {
        expiresIn: jsonWebTokenSettings.expiresIn
      })
    });
  }
}

export default new SessionController();
