const mongoose = require('mongoose');
const Challenge = require('../models/Challenge');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Challenge.deleteMany();
  await Challenge.insertMany([
    { title: "Build a weather app", category: "Web Dev", difficulty: "medium" },
    { title: "Create a meme generator", category: "Fun", difficulty: "easy" },
    { title: "CLI word counter", category: "CLI", difficulty: "easy" },
    { title: "Mini portfolio site", category: "Frontend", difficulty: "medium" },
    { title: "Library REST API", category: "Backend", difficulty: "medium" },
  ]);
  console.log("✅ Seeded challenges");
  process.exit();
});
