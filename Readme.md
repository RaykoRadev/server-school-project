# Pet Shelter API

This is an **Express.js** server application implementing a backend API for a **school-puzzles-and-tasks**.

It manages users and a pets collection (user-generated content), using **MongoDB** with **Mongoose** for data persistence.

---

## Features

-   User authentication
-   Secure password hashing with **bcrypt**

---

## Project Structure

-   **Models**: Defines Mongoose schemas and models for the entities in the system.
-   **Controllers**: Handle API logic (not shown here).
-   **Routes**: API endpoints (not shown here).

---

## Mongoose Schemas Overview

### Student Schema

-   `username`: min length enforced
-   `code`: hashed string, min length enforced
-   Codes are hashed automatically before saving
-   Request returns: `{
  _id: string,
  accessToken: string,
  role: string,
  username: string,
  admin: ObjectId
}`

### Admin Schema

-   `username`: min length enforced
-   `code`: hashed string, min length enforced
-   Codes are hashed automatically before saving
-   Request returns: `{
  _id: string,
  accessToken: string,
  role: string,
  username: string
}`

<!-- ### Animals Schema (Pet/Post)

-   `name`: min length enforced
-   `description`: optional string
-   `age`: required number
-   `imageUrl`: required string, min length enforced
-   `author`: reference to the User who created the post
-   `likes`: array of references to User documents who liked the post
-   Timestamps for creation and updates -->

---

## Installation

```bash
git clone <repository-url>
cd <project-folder>
npm install
```
