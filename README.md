// README.md

# Backend Boilerplate (Node.js + Express + TypeScript)

A general-purpose, scalable, and secure backend starter built with **Node.js**, **Express**, and **TypeScript**. Designed to be used as a base for multiple applications by duplicating and customizing the modules you need.

---

## 🚀 Features

- ✅ Fully typed with TypeScript (strict mode)
- ✅ Modular and layered architecture
- ✅ MongoDB with Mongoose ODM
- ✅ JWT-based Authentication with Refresh Token
- ✅ Cookie-based token storage (secure, httpOnly)
- ✅ Middleware system (CORS, Helmet, Error Handling, Logging)
- ✅ Relative path imports only

---

## 📁 Folder Structure

```
backend-boilerplate/
├── src/
│   ├── api/           # Feature modules (auth, user, etc.)
│   ├── config/        # Database and environment config
│   ├── middlewares/   # Global middleware handlers
│   ├── app.ts         # App instance configuration
│   └── server.ts      # Entry point
├── .env.example       # Environment variable template
├── tsconfig.json      # TypeScript configuration
├── package.json       # Project metadata
└── README.md          # Project documentation
```

---

## 🛠️ Getting Started

### 1. Clone this project

```bash
git clone https://github.com/your-username/backend-boilerplate.git
cd backend-boilerplate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Rename `.env.example` to `.env` and update the values as needed:

```bash
cp .env.example .env
```

### 4. Start MongoDB (local or Docker)

```bash
# Example using Docker:
docker run -d -p 27017:27017 --name mongo mongo
```

### 5. Run the project

```bash
npm run dev
```

Project will be running at: [http://localhost:5000](http://localhost:5000)

---

## 📬 API Endpoints

| Method | Route                | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register a new user  |
| POST   | `/api/auth/login`    | Login and get tokens |

---

## 🔒 Security Notes

- All tokens are signed and stored securely
- Refresh tokens use `httpOnly` secure cookies
- Helmet is enabled by default

---

## 📦 Planned Extensions

- RBAC (Roles & Permissions)
- 2FA (Two-Factor Authentication)
- API Key support
- Cloudinary integration
- Docker Compose with Redis, Mongo
- Swagger documentation

---

## 🧑 Author

Created by [Deolindo Baptista](https://github.com/Deobap73) • SparkTech Lab
