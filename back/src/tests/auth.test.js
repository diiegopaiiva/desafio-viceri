const request = require('supertest');
const app = require('../server');
const { User } = require('../models');

beforeEach(async () => {
  await User.destroy({ where: {} });
});

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Test User');
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
    expect(res.body).not.toHaveProperty('password');
  });

  it('should not allow registration with an existing email', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Another User',
        email: 'testuser@example.com',
        password: 'password456'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Email já cadastrado');
  });

  it('should login an existing user and return a JWT token', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Credenciais inválidas');
  });

  it('should not login with invalid password', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Credenciais inválidas');
  });
});
