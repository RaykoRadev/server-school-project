# Scool-puzzels-and-tasks Project API

This is an **Express.js** server application implementing a backend API for a **school-puzzles-and-tasks**.

It manages users and a pets collection (user-generated content), using **MongoDB** with **Mongoose** for data persistence.

<!-- Deployed version on: https://server-school-project-production.up.railway.app -->

schedule (translated to CRON)
Weekdays (Mon–Fri): 13:00–23:00

→ Every 5 minutes between 13–22 (23 excluded in cron)

Weekends (Sat–Sun): 08:00–23:00

→ Every 5 minutes between 8–22

---

## Features

- User authentication
- Secure password hashing with **bcrypt**

---

## Project Structure

- **Models**: Defines Mongoose schemas and models for the entities in the system.
- **Controllers**: Handle API logic (not shown here).
- **Routes**: API endpoints (not shown here).

---

## Mongoose Schemas Overview

### Student Schema

- `username`: min length enforced
- `code`: hashed string, min length enforced
- Codes are hashed automatically before saving
- Request returns: `{
  _id: string,
  accessToken: string,
  role: string,
  username: string,
  teacherId: ObjectId
  classId: ObjectId,
  subActive: Boolean,
  avatar: string
  expiredAt: date,
  sesions: Array with {loginAt, durationSeconds?}
  subjectUsage: Object
}`
- register student link: `.../student/register` (body: {username: ..., code: ..., teacherId: teacherId, classId: teacherId})
- login link: `.../student/login` (body: {username: ..., code: ...})
- delete link: `.../:teacherId/:studentId/delete`
- edit link: `.../student/:teacherId/:studentId/edit` (body: {username: ..., code: ...})
- get one student link: `.../student/:teacherId/:studentId`

### Teacher Schema

- `username`: min length enforced
- `code`: hashed string, min length enforced
- Codes are hashed automatically before saving
- DB retyrns: `{
  username: string,
  code: string,
  role: 'teacher',
  classes: [{
  name: string,
  subjects: [{text: string, link: string}],
  \_id: ObjectId,
  classId: ObjectId
  },],
  subscriptionStatus: string,
  subscriptionExpiresAt: date
}`

- Request returns: `{
  _id: string,
  accessToken: string,
  role: string,
  username: string
}`
- register link: `.../admin/register` (body: {username: ...., code:....}) throuth postman
- login link: `.../teacher/login` (body: {username: ...., code:....})
- change code `.../edit-profile`
- renew subscription `.../renew/:teacherId` {"message": "Account reactivated successfully", "expiresAt": ... } throuth postman

### Links:

http://localhost:3000/links/getAllStudents -> array with all students

http://localhost:3000/links/getAllClasses/:teacherId -> array with all classes
http://localhost:3000/links/getOneClass/:teacherId/:classId -> object with one class

http://localhost:3000/links/createLink -> object with created link
http://localhost:3000/links/:classId/:subjectId/:linkId/delete -> object with info
http://localhost:3000/links/getOneLink/:classId/:subjectId/:linkId -> object with one link
http://localhost:3000/links/:classId/:subjectId/:linkId/edit-> object with edited link

---

## Installation

```bash
git clone <repository-url>
cd <project-folder>
npm install
```
