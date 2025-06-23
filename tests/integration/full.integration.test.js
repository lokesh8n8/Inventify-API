const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server'); // Make sure your server.js exports the app

const Challenge = require('../../models/Challenge');
const Rating = require('../../models/Rating');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Challenge.deleteMany();
  await Rating.deleteMany();
});

describe('Full Integration Tests for Challenge API', () => {
  let challengeId;

  beforeEach(async () => {
    const challenge = await Challenge.create({
      title: 'Sample Challenge',
      tags: ['js', 'api'],
      featured: true,
      difficulty: 'easy',
      category: 'Web',
    });
    challengeId = challenge._id.toString();
  });

  it('GET /challenge/random - should return a random challenge', async () => {
    const res = await request(app).get('/challenge/random');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
  });

  it('GET /challenge/of-the-day - should return the featured challenge', async () => {
    const res = await request(app).get('/challenge/of-the-day');
    expect(res.statusCode).toBe(200);
    expect(res.body.featured).toBe(true);
  });

  it('GET /challenge/top - should return top rated challenges', async () => {
    await Rating.create([
      { challengeId, rating: 5 },
      { challengeId, rating: 4 },
    ]);
    const res = await request(app).get('/challenge/top');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /challenge/tags - should return tags', async () => {
    const res = await request(app).get('/challenge/tags');
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('js');
  });

  it('GET /challenge?tag=js - should return challenges by tag', async () => {
    const res = await request(app).get('/challenge?tag=js');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /challenge - should return 400 without tag', async () => {
    const res = await request(app).get('/challenge');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Missing ?tag=');
  });

  it('GET /challenge/all - should return all challenges', async () => {
    const res = await request(app).get('/challenge/all');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /challenge/:id/rate - should create a new rating', async () => {
    const res = await request(app)
      .post(`/challenge/${challengeId}/rate`)
      .send({ rating: 5, comment: 'Awesome!' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('rating', 5);
  });

  it('GET /challenge/:id/ratings - should return avgRating and total', async () => {
    await Rating.create([{ challengeId, rating: 4 }, { challengeId, rating: 2 }]);
    const res = await request(app).get(`/challenge/${challengeId}/ratings`);
    expect(res.statusCode).toBe(200);
    expect(res.body.avgRating).toBe(3);
expect(res.body.total).toBe(2);

  });
});
