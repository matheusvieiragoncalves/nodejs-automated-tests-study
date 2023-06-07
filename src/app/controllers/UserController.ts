import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import * as Yup from 'yup';
import AbstractController from '../../core/AbstractController';

const prisma = new PrismaClient();

interface User {
  id: number;
  email: string;
  password: string;
  passwordHash: string;
}

interface AuthRequest extends Request {
  userId?: number;
  user?: any;
}

class UserController extends AbstractController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await prisma.user.findMany();

    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    });

    return res.json(user);
  }

  public async store(
    req: AuthRequest,
    res: Response,
    next: any
  ): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    });

    const error = await super.validateData(req, res, schema);

    if (Object.keys(error).length) {
      return res.status(400).json({ error });
    }

    const { email, password }: User = { ...req.body };

    const passwordHash = await bcrypt.hash(password, 8);

    const emailAlreadyRegistered = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (emailAlreadyRegistered) {
      return res
        .status(400)
        .json({ error: { email: 'E-mail já cadastrado!' } });
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash
      }
    });

    return res.status(201).json(user);
  }

  public async update(req: AuthRequest, res: Response): Promise<Response> {
    const { email, password } = req.body as User;

    const passwordHash = await bcrypt.hash(password, 8);

    const oldUser = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    if (!oldUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const emailAlreadyRegistered = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (emailAlreadyRegistered && emailAlreadyRegistered.id !== req.userId) {
      return res.status(401).json({ error: 'E-mail Already Registered' });
    }

    const newUser = await prisma.user.update({
      where: { id: req.userId },
      data: { id: req.userId, email, passwordHash }
    });

    return res.json(newUser);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    let itemDeleted = null;

    await prisma.user
      .delete({
        where: { id: Number(id) }
      })
      .then(() => {
        itemDeleted = true;
      })
      .catch(() => {
        itemDeleted = false;
      });

    return res.json({ itemDeleted });
  }
}

export default new UserController();
