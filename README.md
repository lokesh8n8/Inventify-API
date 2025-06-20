# Micro Hackathon API & Frontend

A full-stack project for generating, rating, and exploring coding challenges.

---

## 🚀 Features

- 🎲 Generate a random coding challenge
- ⭐ Submit and view star ratings (1–5)
- 🏆 View top-rated challenges
- 🔍 Filter challenges by difficulty or tag
- 🌟 See a featured "Challenge of the Day"
- 🖥️ Modern React frontend with Tailwind CSS

---

## 🛠️ API Overview

All API endpoints are prefixed with:  
`https://inventify-api.onrender.com/challenge/`

| Endpoint                   | Method | Description                                 |
|----------------------------|--------|---------------------------------------------|
| `/random`                  | GET    | Get a random challenge (optionally by difficulty) |
| `/of-the-day`              | GET    | Get the featured challenge of the day       |
| `/top`                     | GET    | Get top-rated challenges                    |
| `/tags`                    | GET    | Get all unique tags                         |
| `/` (with `?tag=...`)      | GET    | Get challenges by tag                       |
| `/all`                     | GET    | Get all challenges                          |
| `/:id/rate`                | POST   | Submit a rating for a challenge             |
| `/:id/ratings`             | GET    | Get average rating and count for a challenge|

See [`api.md`](api.md) for full documentation and sample responses.

---

## 🗄️ Database

- **Database:** MongoDB Atlas (cloud-hosted)
- **Integration:**  
  - The server uses [Mongoose](https://mongoosejs.com/) to define schemas for `Challenge` and `Rating`.
  - Connection string is stored in `.env` as `MONGO_URI`.
  - Models are in [`models/Challenge.js`](models/Challenge.js) and [`models/Rating.js`](models/Rating.js).

---

## 🖥️ How to Run the Server

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up environment variables:**  
   Create a `.env` file in the root directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=4000
   ```

3. **Seed the database (optional):**
   ```sh
   npm run seed
   ```

4. **Start the server:**
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:4000/challenge/`

---

## 🖼️ How to Run the Frontend Locally

1. **Navigate to the frontend directory:**
   ```sh
   cd app
   ```

2. **Install frontend dependencies:**
   ```sh
   npm install
   ```

3. **Set up frontend environment variables:**  
   Create a `.env` file in the `app/` directory:
   ```
   REACT_APP_API_BASE_URL=http://localhost:4000
   ```

4. **Start the frontend:**
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:3000`

---

## 📄 More

- API documentation: [api.md](api.md)
- Main backend entry: [server.js](server.js)
- Main frontend entry: [app/src/App.js](app/src/App.js)

---

<center>

**Enjoy building and rating challenges!**

</center>
