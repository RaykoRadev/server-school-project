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
  classId: ObjectId,
  expiredAt: date,
  sesions: Array with {loginAt, durationSeconds?}
  subjectUsage: Object
}`
-   register link: `.../student/register` (body: {username: ..., code: ..., teacherId: teacherId, classId: teacherId})
-   login link: `.../login/register` (body: {username: ..., code: ..., teacherId: teacherId, classId: teacherId})
-   delete link: `.../:teacherId/:studentId/delete` (body: {username: ..., code: ..., teacherId: teacherId, classId: teacherId})

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

### Links:

http://localhost:3000/links/getAllStudents -> array with all students
http://localhost:3000/links/getAllClasses -> array with all classes

---

## Installation

```bash
git clone <repository-url>
cd <project-folder>
npm install
```
