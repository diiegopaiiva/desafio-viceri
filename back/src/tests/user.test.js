const request = require('supertest');
const app = require('../server');

describe('User Registration and Login', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not allow registration with an existing email', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Another User',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(400);
  });

  it('should login the user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
