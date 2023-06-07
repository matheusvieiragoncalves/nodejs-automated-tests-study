import { PrismaClient } from '.prisma/client';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

const prisma = new PrismaClient();

afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe('Authentication', () => {
  it('should sum two numbers', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'teste@email.com',
        passwordHash: '123456'
      }
    });

    const hash = await bcrypt.hash('123456', 8);

    const compareHash = await bcrypt.compare('123456', hash);

    expect(compareHash).toBe(true);
  });

  app;
});
