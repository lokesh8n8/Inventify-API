# Micro Hackathon API

**Base URL:**  
`https://inventify-api.onrender.com/challenge/`

---

## Table of Contents

- [Get Random Challenge](#get-random-challenge)
- [Get Challenge of the Day](#get-challenge-of-the-day)
- [Get Top Rated Challenges](#get-top-rated-challenges)
- [Get All Tags](#get-all-tags)
- [Get Challenges by Tag](#get-challenges-by-tag)
- [Get All Challenges](#get-all-challenges)
- [Rate a Challenge](#rate-a-challenge)
- [Get Challenge Ratings](#get-challenge-ratings)
- [Error Responses](#error-responses)

---

## Get Random Challenge

- **Endpoint:** `/random`
- **Method:** `GET`
- **Query Parameters:**  
  - `difficulty` (optional): `easy`, `medium`, `hard`

**Example:**  
`GET /challenge/random?difficulty=easy`

**Sample Response:**
```json
{
  "_id": "65f1c2...",
  "title": "Build a weather app",
  "category": "Web Dev",
  "difficulty": "medium",
  "tags": ["api", "frontend", "weather"],
  "featured": false,
  "createdAt": "2024-03-13T...",
  "avgRating": 4.2,
  "ratingCount": 5
}
```

---

## Get Challenge of the Day

- **Endpoint:** `/of-the-day`
- **Method:** `GET`

**Example:**  
`GET /challenge/of-the-day`

**Sample Response:**
```json
{
  "_id": "65f1c2...",
  "title": "Build a weather app",
  "category": "Web Dev",
  "difficulty": "medium",
  "tags": ["api", "frontend", "weather"],
  "featured": true,
  "createdAt": "2024-03-13T..."
}
```

---

## Get Top Rated Challenges

- **Endpoint:** `/top`
- **Method:** `GET`

**Example:**  
`GET /challenge/top`

**Sample Response:**
```json
[
  {
    "_id": "65f1c2...",
    "title": "Real-time chat app",
    "category": "Web Dev",
    "avgRating": 4.8,
    "count": 10
  },
  {
    "_id": "65f1c3...",
    "title": "Mini portfolio site",
    "category": "Frontend",
    "avgRating": 4.5,
    "count": 8
  }
]
```

---

## Get All Tags

- **Endpoint:** `/tags`
- **Method:** `GET`

**Example:**  
`GET /challenge/tags`

**Sample Response:**
```json
["api", "frontend", "weather", "fun", "image", "cli"]
```

---

## Get Challenges by Tag

- **Endpoint:** `/`
- **Method:** `GET`
- **Query Parameters:**  
  - `tag` (required): Filter challenges by tag

**Example:**  
`GET /challenge?tag=frontend`

**Sample Response:**
```json
[
  {
    "_id": "65f1c2...",
    "title": "Mini portfolio site",
    "category": "Frontend",
    "difficulty": "medium",
    "tags": ["frontend", "portfolio"],
    "featured": false,
    "createdAt": "2024-03-13T..."
  }
]
```

---

## Get All Challenges

- **Endpoint:** `/all`
- **Method:** `GET`

**Example:**  
`GET /challenge/all`

**Sample Response:**  
Array of all challenge objects (see above for structure).

---

## Rate a Challenge

- **Endpoint:** `/:id/rate`
- **Method:** `POST`
- **Path Parameters:**  
  - `id`: The challenge ID

**Request Body:**
```json
{
  "rating": 4
}
```

**Example:**  
`POST /challenge/65f1c2.../rate`

**Sample Response:**
```json
{
    "challengeId": "6855d39ac7f92790...",
    "rating": 4,
    "_id": "6855e74cabe76bc068d4...",
    "__v": 0
}
```

---

## Get Challenge Ratings

- **Endpoint:** `/:id/ratings`
- **Method:** `GET`
- **Path Parameters:**  
  - `id`: The challenge ID

**Example:**  
`GET /challenge/65f1c2.../ratings`

**Sample Response:**
```json
{
  "avgRating": 4.2,
  "total": 5
}
```

---

## Error Responses

- **404 Not Found:**  
  ```json
  { "message": "No challenges found" }
  ```
- **400 Bad Request:**  
  ```json
  { "message": "Missing ?tag=" }
  ```
- **500 Internal Server Error:**  
  ```json
  { "error": "Error message" }
  ```

---

## Notes

- All endpoints return JSON.
- All endpoints are CORS-enabled.
- For POST requests, set `Content-Type: application/json`.
- For more details, see the implementation in your backend code.

---

**Base URL:**  
[https://inventify-api.onrender.com/challenge/](https://inventify-api.onrender.com/challenge/)