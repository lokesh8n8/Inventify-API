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
    { title: "Real-time chat app", category: "Web Dev", difficulty: "hard", tags: ["websocket", "realtime", "chat"] },
    { title: "Markdown blog engine", category: "Backend", difficulty: "medium", tags: ["markdown", "blog", "backend"] },
    { title: "Expense tracker", category: "Fullstack", difficulty: "medium", tags: ["finance", "fullstack", "tracker"] },
    { title: "Todo app with drag & drop", category: "Frontend", difficulty: "easy", tags: ["todo", "frontend", "dragdrop"] },
    { title: "Image compression CLI", category: "CLI", difficulty: "medium", tags: ["cli", "image", "compression"] },
    { title: "Quiz API", category: "Backend", difficulty: "easy", tags: ["api", "quiz", "backend"] },
    { title: "Recipe finder", category: "Web Dev", difficulty: "medium", tags: ["api", "frontend", "recipe"] },
    { title: "URL shortener", category: "Backend", difficulty: "medium", tags: ["backend", "url", "shortener"] },
    { title: "Kanban board", category: "Fullstack", difficulty: "hard", tags: ["fullstack", "kanban", "project"] },
    { title: "CSV to JSON converter", category: "CLI", difficulty: "easy", tags: ["cli", "csv", "json"] },
    { title: "Personal notes app", category: "Frontend", difficulty: "easy", tags: ["frontend", "notes", "app"] },
    { title: "Movie search app", category: "Web Dev", difficulty: "medium", tags: ["api", "frontend", "movie"] },
    { title: "Authentication system", category: "Backend", difficulty: "hard", tags: ["backend", "auth", "security"] },
    { title: "Stock price tracker", category: "Web Dev", difficulty: "medium", tags: ["api", "finance", "frontend"] },
    { title: "Pomodoro timer", category: "Frontend", difficulty: "easy", tags: ["frontend", "timer", "productivity"] },
    { title: "Blog CMS", category: "Fullstack", difficulty: "hard", tags: ["cms", "fullstack", "blog"] },
    { title: "Music playlist API", category: "Backend", difficulty: "medium", tags: ["backend", "api", "music"] },
    { title: "PDF merger CLI", category: "CLI", difficulty: "medium", tags: ["cli", "pdf", "utility"] },
    { title: "E-commerce product page", category: "Frontend", difficulty: "medium", tags: ["frontend", "ecommerce", "product"] },
    { title: "Chatbot with AI", category: "Web Dev", difficulty: "hard", tags: ["ai", "chatbot", "web"] },
    { title: "Fitness tracker", category: "Fullstack", difficulty: "medium", tags: ["fitness", "fullstack", "tracker"] },
    { title: "Currency converter", category: "Frontend", difficulty: "easy", tags: ["frontend", "currency", "converter"] },
    { title: "Newsletter signup API", category: "Backend", difficulty: "easy", tags: ["backend", "api", "newsletter"] },
    { title: "File uploader", category: "Web Dev", difficulty: "medium", tags: ["web", "file", "upload"] },
    { title: "Graph visualizer", category: "Frontend", difficulty: "hard", tags: ["frontend", "graph", "visualization"] },
    { title: "JWT authentication CLI", category: "CLI", difficulty: "hard", tags: ["cli", "jwt", "auth"] },
    { title: "Event calendar", category: "Fullstack", difficulty: "medium", tags: ["calendar", "fullstack", "event"] },
    { title: "Markdown previewer", category: "Frontend", difficulty: "easy", tags: ["frontend", "markdown", "preview"] }
  ]);
  console.log("✅ Seeded challenges");
  process.exit();
});
