import { PrismaClient } from '.prisma/client';
import request from 'supertest';
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
    await request(app).post('/users').send({
      email: 'teste@email.com',
      password: '123456'
    });

    const response = await request(app).post('/sessions').send({
      email: 'teste@email.com',
      password: '123456'
    });

    expect(response.status).toBe(200);
  });

  app;
});
