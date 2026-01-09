# Express + Mongoose + MongoDB Atlas on Railway

**Goal:** Non‑serverless Express API with MongoDB, free tier, minimal cold start.

---

## Architecture
```
React 19 Frontend  → Firebase Hosting
Static Avatars     → Firebase Hosting (/public/avatars)
Express API        → Railway (free tier)
Database           → MongoDB Atlas (M0 free)
```

---

## Core Principles (Do Not Skip)
- ❌ Do **not** connect to MongoDB at server startup.
- ✅ Use **lazy connection** with a **single cached client**.
- ✅ Bind Express to `0.0.0.0` and `process.env.PORT`.
- ✅ Disable expensive Mongoose startup features in production.

---

## Project Structure
```
.
├── index.js
├── db.js
├── models/
│   └── User.js
├── package.json
└── .env (local only)
```

---

## Mongoose Connection Helper (CRITICAL)
Create **one** connection and reuse it.

**db.js**
```js
import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: "your_db_name",
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000
    }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
```

**Why this works**
- Prevents connection storms
- Survives sleep / wake cycles
- Minimal cold start impact

---

## Mongoose Production Settings
Place **once** (top-level) before models are used:

```js
import mongoose from "mongoose";

mongoose.set("autoIndex", false);
mongoose.set("bufferCommands", false);
```

---

## Express Server (Minimal & Safe)

**index.js**
```js
import express from "express";
import { connectDB } from "./db.js";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.status(200).send("ok"));

app.get("/api/users", async (req, res) => {
  try {
    await connectDB();
    // const users = await User.find().limit(10);
    res.json([]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database unavailable" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## MongoDB Atlas Checklist
- Cluster: **M0 Free Tier**
- Network Access: `0.0.0.0/0`
- Create a DB user with read/write
- Region close to Railway

---

## Railway Setup
1. Push repo to GitHub
2. Railway → **New Project** → **Deploy from GitHub**
3. No Docker required
4. Start command: `npm start`

### Environment Variables (Railway → Variables)
```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/?retryWrites=true&w=majority
NODE_ENV=production
```

---

## Firebase Hosting (Frontend + Avatars)
- Put avatars in `/public/avatars/*.png`
- Use `<img src="/avatars/avatar1.png" />`

### Optional: Proxy API through Firebase
```json
{
  "hosting": {
    "rewrites": [
      { "source": "/api/**", "destination": "https://your-app.up.railway.app" }
    ]
  }
}
```

---

## Cold Start Expectations
- App boot: ~300–600ms
- First Mongo connection: ~1–2s
- Total cold start: **~2–4s**

### Keep Warm (Free)
- Ping `/health` every 10–15 minutes (UptimeRobot / GitHub Actions)

---

## Common Mistakes ❌
- `mongoose.connect()` at top-level
- New DB connection per request
- `autoIndex: true` in production
- Blocking startup on DB

---

## Ready to Scale Later
- Move API to Fly.io or paid Railway
- Same code, no refactor
- MongoDB Atlas scales independently

---

**Status:** Production‑safe, free, minimal cold start

