# Scool-puzzels-and-tasks Project API

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
  teacherId: ObjectId
  classId: ObjectId
}`
-   register link: `.../student/register` (body: {username: ..., code: ..., teacherId: teacherId, classId: teacherId})

### Teacher Schema

-   `username`: min length enforced
-   `code`: hashed string, min length enforced
-   Codes are hashed automatically before saving
-   DB retyrns: `{
  username: string,
  code: string,
  role: 'teacher',
  classes: [{
  name: string,
  subjects: [{text: string, link: string}],
  \_id: ObjectId,
  classId: ObjectId
  },]
}`

-   Request returns: `{
  _id: string,
  accessToken: string,
  role: string,
  username: string
}`
-   register link: `.../admin/register` (body: {username: ...., code:....}) throuth postman

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

<!--
            {
                classId: ObjectId(),
                name: "class1",
                subjects: [
                    { name: "bg", links: [linksSchema] },
                    { name: "math", links: [linksSchema] },
                    { name: "eng", links: [linksSchema] },
                    { name: "music", links: [linksSchema] },
                    { name: "technology", links: [linksSchema] },
                    { name: "physicalExercises", links: [linksSchema] },
                    { name: "rodinoznanie", links: [linksSchema] },
                ],
            },
            {
                classId: ObjectId(),
                name: "class2",
                subjects: [
                    { name: "bg", links: [linksSchema] },
                    { name: "math", links: [linksSchema] },
                    { name: "eng", links: [linksSchema] },
                    { name: "music", links: [linksSchema] },
                    { name: "technology", links: [linksSchema] },
                    { name: "physicalExercises", links: [linksSchema] },
                    { name: "rodinoznanie", links: [linksSchema] },
                ],
            },
            {
                classId: ObjectId(),
                name: "class3",
                subjects: [
                    { name: "bg", links: [linksSchema] },
                    { name: "math", links: [linksSchema] },
                    { name: "eng", links: [linksSchema] },
                    { name: "music", links: [linksSchema] },
                    { name: "technology", links: [linksSchema] },
                    { name: "physicalExercises", links: [linksSchema] },
                    { name: "human&nature", links: [linksSchema] },
                    { name: "human&society", links: [linksSchema] },
                ],
            },
            {
                classId: ObjectId(),
                name: "class4",
                subjects: [
                    { name: "bg", links: [linksSchema] },
                    { name: "math", links: [linksSchema] },
                    { name: "eng", links: [linksSchema] },
                    { name: "music", links: [linksSchema] },
                    { name: "technology", links: [linksSchema] },
                    { name: "physicalExercises", links: [linksSchema] },
                    { name: "human&nature", links: [linksSchema] },
                    { name: "human&society", links: [linksSchema] },
                ],
            }, -->
