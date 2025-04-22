import { faker } from '@faker-js/faker/.';
import request from 'supertest';
import { generateFakeUser } from '../../src/common/factories/generateFakeUser';
import { Jwt } from '../../src/common/libs/Jwt';
import { env } from '../../src/env';
import type { User } from '../../src/modules/auth/entities/User';
import { app } from '../../src/server/app';

describe('Posts - Integration tests', () => {
  const jwt = new Jwt(env.JWT_SECRET);
  let testUser = {} as User;
  const testUserPassword = faker.internet.password();
  let authToken: string;
  let createdPostId: string;

  beforeAll(async () => {
    testUser = await generateFakeUser(testUserPassword);
    authToken = jwt.encrypt({ id: testUser.id });
  });

  describe('GET /posts', () => {
    it('should return a list of posts', async () => {
      const response = await request(app)
        .get('/api/posts')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should return posts when not authenticated', async () => {
      const response = await request(app).get('/api/posts');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /posts', () => {
    it('should create a post', async () => {
      const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: 'Hello world!' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      createdPostId = response.body.id;
    });

    it('should not create a post when not authenticated', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({ text: 'No auth' });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should delete a post', async () => {
      const postResponse = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: 'Delete this post' });

      const postId = postResponse.body.id;
      const response = await request(app)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(204);
    });

    it('should not delete a post that does not exist', async () => {
      const response = await request(app)
        .delete(`/api/posts/${faker.string.uuid()}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(404);
    });

    it('should not delete a post when not authenticated', async () => {
      const response = await request(app).delete(`/api/posts/${createdPostId}`);

      expect(response.statusCode).toBe(401);
    });
  });

  describe('POST /posts/:postId/like', () => {
    it('should like/unlike a post', async () => {
      const response = await request(app)
        .post(`/api/posts/${createdPostId}/like`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
    });

    it('should not like a post when not authenticated', async () => {
      const response = await request(app).post(
        `/api/posts/${createdPostId}/like`
      );

      expect(response.statusCode).toBe(401);
    });
  });
});
