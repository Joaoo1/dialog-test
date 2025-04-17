import { faker } from '@faker-js/faker/.';
import request from 'supertest';
import { generateFakeUser } from '../../src/common/factories/generateFakeUser';
import { Jwt } from '../../src/common/libs/Jwt';
import { env } from '../../src/env';
import type { User } from '../../src/modules/auth/entities/User';
import { app } from '../../src/server/app';

describe('Users - Integration tests', () => {
  const jwt = new Jwt(env.JWT_SECRET);
  let testUser = {} as User;
  const testUserPassword = faker.internet.password();
  let authToken: string;

  beforeAll(async () => {
    testUser = await generateFakeUser(testUserPassword);
    authToken = jwt.encrypt({ id: testUser.id });
  });

  describe('GET /users', () => {
    it('should return an user profile info', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', testUser.id);
    });

    it('should not return user profile info when not authenticated', async () => {
      const response = await request(app).get('/api/users');

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PUT /users', () => {
    it('should update a user profile', async () => {
      const updatedData = {
        name: 'Updated Name',
      };

      const response = await request(app)
        .put('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData);
      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.user.name).toBe(updatedData.name);
    });

    it('should throw an error when trying to update with an existing email', async () => {
      const existingUser = await generateFakeUser();

      const updatedData = {
        email: existingUser.email,
      };
      const response = await request(app)
        .put('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData);

      expect(response.statusCode).toBe(409);
    });

    it('should not update a user profile when not authenticated', async () => {
      const updatedData = {
        name: 'Updated Name',
      };

      const response = await request(app).put('/api/users').send(updatedData);

      expect(response.statusCode).toBe(401);
    });
  });

  describe('DELETE /users', () => {
    it('should delete a user by id', async () => {
      const user = await generateFakeUser();
      const token = jwt.encrypt({ id: user.id });

      const response = await request(app)
        .delete('/api/users')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(204);
    });

    it('should not delete a user when not authenticated', async () => {
      const response = await request(app).delete('/api/users');

      expect(response.statusCode).toBe(401);
    });
  });
});
