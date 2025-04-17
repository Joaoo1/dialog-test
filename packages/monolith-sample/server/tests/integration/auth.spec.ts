import { faker } from '@faker-js/faker/.';
import request from 'supertest';
import { generateFakeUser } from '../../src/common/factories/generateFakeUser';
import type { User } from '../../src/modules/auth/entities/User';
import { app } from '../../src/server/app';

describe('Auth - Integration tests', () => {
  let testUser = {} as User;
  const testUserPassword = faker.internet.password();

  beforeAll(async () => {
    testUser = await generateFakeUser(testUserPassword);
  });

  describe('POST /auth/sign-up', () => {
    it('should register a new user', async () => {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const response = await request(app).post('/api/auth/sign-up').send(user);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('user');
    });

    it('should not allow duplicate registration', async () => {
      const response = await request(app)
        .post('/api/auth/sign-up')
        .send({
          email: testUser.email,
          password: testUserPassword,
          name: testUser.name,
        });

      expect(response.statusCode).toBe(409);
    });
  });

  describe('POST /auth/sign-in', () => {
    it('should authenticate and return a token', async () => {
      const response = await request(app).post('/api/auth/sign-in').send({
        email: testUser.email,
        password: testUserPassword,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should not authenticate with invalid credentials', async () => {
      const response = await request(app).post('/api/auth/sign-in').send({
        email: testUser.email,
        password: 'wrongpassword',
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
