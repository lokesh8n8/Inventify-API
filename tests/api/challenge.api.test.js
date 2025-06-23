const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../../server");
const Challenge = require("../../models/Challenge");
const Rating = require("../../models/Rating");

describe("API Contract Tests for /challenge", () => {
  let createdChallengeId;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const challenge = await Challenge.create({
      title: "Seeded Challenge",
      tags: ["js"],
      featured: true,
      difficulty: "easy",
      category: "Web",
    });

    createdChallengeId = challenge._id.toString();
  });

  afterAll(async () => {
    await Promise.all([
      Challenge.deleteMany({}),
      Rating.deleteMany({})
    ]);
    await mongoose.disconnect();
  });

  it("GET /challenge/all - should return array of challenges", async () => {
    const res = await request(app).get("/challenge/all");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length) {
      expect(res.body[0]).toHaveProperty("title");
    }
  });

  it("GET /challenge - should return 400 if ?tag is missing", async () => {
    const res = await request(app).get("/challenge");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Missing ?tag=");
  });

  it("GET /challenge?tag=js - should return filtered results", async () => {
    const res = await request(app).get("/challenge?tag=js");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /challenge/tags - should return an array of tags", async () => {
    const res = await request(app).get("/challenge/tags");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain("js");
  });

  it("GET /challenge/of-the-day - should return a challenge or empty object", async () => {
    const res = await request(app).get("/challenge/of-the-day");
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
  });

  it("GET /challenge/top - should return an array (even if empty)", async () => {
    const res = await request(app).get("/challenge/top");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /challenge/:id/rate - should return 500 if no rating provided", async () => {
    const res = await request(app)
      .post(`/challenge/${createdChallengeId}/rate`)
      .send({});
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /challenge/:id/ratings - should return average rating or defaults", async () => {
    const res = await request(app).get(
      `/challenge/${createdChallengeId}/ratings`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("avgRating");
    expect(res.body).toHaveProperty("total");
  });

  it("GET /challenge/random - should return a challenge or 404", async () => {
    const res = await request(app).get("/challenge/random");
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty("title");
    }
  });
});
