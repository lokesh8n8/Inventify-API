const mongoose = require("mongoose");
const Challenge = require("../models/Challenge");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Challenge.deleteMany();
  await Challenge.insertMany([
    { title: "Build a weather app", category: "Web Dev", difficulty: "medium", tags: ["api", "frontend", "weather"] },
    { title: "Create a meme generator", category: "Fun", difficulty: "easy", tags: ["fun", "frontend", "image"] },
    { title: "CLI word counter", category: "CLI", difficulty: "easy", tags: ["cli", "text", "utility"] },
    { title: "Mini portfolio site", category: "Frontend", difficulty: "medium", tags: ["frontend", "portfolio"] },
    { title: "Library REST API", category: "Backend", difficulty: "medium", tags: ["backend", "api", "library"] },
    { title: "Build a weather app", category: "Web Dev", difficulty: "medium", tags: ["api", "frontend", "weather"], featured: true },
    { title: "Create a meme generator", category: "Fun", difficulty: "easy", tags: ["fun", "frontend", "image"] },
  ]);
  console.log("✅ Seeded challenges");
  process.exit();
});
