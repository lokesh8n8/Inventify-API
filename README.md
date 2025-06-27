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

## 🧪 Testing Guide

This project includes comprehensive testing across different layers of the application using modern JavaScript testing tools. The test suite is divided into:

- **Unit Tests**: Validate individual functions in isolation.
- **Integration Tests**: Test the interaction between models, controllers, and the database using an in-memory MongoDB instance.
- **API Contract Tests**: Verify the behavior and response structure of RESTful API endpoints.

### 📚 Tools & Libraries Used

| Purpose              | Tool/Library              |
|----------------------|---------------------------|
| Test Runner          | [Jest](https://jestjs.io) |
| HTTP Testing         | [Supertest](https://github.com/ladjs/supertest) |
| In-Memory Database   | [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) |
| Code Coverage        | Built-in Jest Coverage    |

---

### 🚀 Running Tests

To run all tests (unit, integration, and API tests):

```bash
npm test
```

To run a specific test file (e.g., unit tests):

```bash
npx jest tests/unit/challengeController.unit.test.js
```

To view code coverage results in the terminal and open an HTML report:

```bash
npm test -- --coverage
```

The HTML report will be generated in the `coverage/lcov-report/index.html` file.

---

### ✅ Test Output Example

Below is an example of the test output with coverage:

```
PASS  tests/unit/challengeController.unit.test.js
PASS  tests/integration/full.integration.test.js
PASS  tests/api/challenge.api.test.js

Test Suites: 3 passed, 3 total
Tests:       33 passed, 33 total
Snapshots:   0 total
Time:        5.221 s

------------------------------|---------|----------|---------|---------|------------------- 
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------|---------|----------|---------|---------|------------------- 
All files                     |   92.77 |    77.77 |   72.72 |   92.59 |                   
 controllers/                 |     100 |    92.85 |     100 |     100 |                   
 models/                      |     100 |      100 |     100 |     100 |                   
 routes/                      |     100 |      100 |     100 |     100 |                   
 server.js                    |    62.5 |       25 |       0 |    62.5 | 17-26             
------------------------------|---------|----------|---------|---------|------------------- 
```
---

### 📸 Coverage Screenshot

![image](https://github.com/user-attachments/assets/b2e3371c-c05d-435b-bae1-e03682500412)


---

## ✅ Keploy API Test Integration

This project integrates [Keploy](https://keploy.io) to enable seamless API test generation and execution. Keploy captures real user traffic and converts it into deterministic test cases which are then run during development and CI/CD workflows.

---

## 🔄 GitHub Actions CI/CD Integration

Keploy has been integrated with GitHub Actions to run API test suites during the CI process.

### Highlights:
- Automatically runs test suites during each push.
- Validates core application logic before merging.
- Reduces risk of regression in production deployments.

### Required GitHub Secrets:
- `MONGO_URI`: Your MongoDB connection string
- `KEPLOY_API_KEY`: API key from Keploy Dashboard

---

## 🧩 Keploy Cloud Test Result

Track test cases, coverage, and results on the [Keploy Cloud Dashboard](https://app.keploy.io).

![image](https://github.com/user-attachments/assets/ec7c1a68-6a28-4a0a-9a2b-1ba7edb7b60a)


---

## ✅ CI Test Run Evidence (GitHub Actions)

![image](https://github.com/user-attachments/assets/6fdc5ef8-7195-41f7-9421-673685f086ee)
 

---

## 📚 Useful Links

- [Keploy Docs](https://docs.keploy.io/)
- [Keploy Cloud Dashboard](https://app.keploy.io/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---


## 📄 More

- API documentation: [api.md](api.md)
- Main backend entry: [server.js](server.js)
- Main frontend entry: [app/src/App.js](app/src/App.js)

---


**Enjoy building and rating challenges!**

