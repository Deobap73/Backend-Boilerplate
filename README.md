# Backend Boilerplate (Node.js + Express + TypeScript)

A general-purpose, scalable, and secure backend starter built with **Node.js**, **Express**, and **TypeScript**. Designed to be used as a base for multiple applications by duplicating and customizing the modules you need.

---

## 🚀 Features

- ✅ Fully typed with TypeScript (strict mode)
- ✅ Modular and layered architecture
- ✅ MongoDB with Mongoose ODM
- ✅ JWT-based Authentication with Refresh Token
- ✅ Cookie-based token storage (secure, httpOnly)
- ✅ RBAC (Role-based Access Control)
- ✅ 2FA (Two-Factor Authentication with TOTP)
- ✅ User management (admin protected)
- ✅ Category & Product management (CRUD)
- ✅ Order system with admin tracking and status updates
- ✅ Notification system (in-app)
- ✅ Internal messaging system (user ↔ user)
- ✅ Bookmarks system (posts/products)
- ✅ Upload and delete images via Cloudinary
- ✅ Middleware system (CORS, Helmet, Error Handling, Logging)
- ✅ Multer integration for file uploads
- ✅ Relative path imports only

---

## 📁 Folder Structure

```
backend-boilerplate/
├── src/
│   ├── api/              # Feature modules (auth, user, product, order, etc.)
│   ├── config/           # Database and environment config
│   ├── middlewares/      # Global middleware handlers
│   ├── shared/           # Reusable utilities (cloudinary, helpers, etc.)
│   ├── types/            # Custom TS types (ex: AuthRequest)
│   ├── app.ts            # App instance configuration
│   └── server.ts         # Entry point
├── .env.example          # Environment variable template
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project metadata
└── README.md             # Project documentation
```

---

## 🛠️ Getting Started

### 1. Clone this project

```bash
git clone git@github.com:Deobap73/Backend-Boilerplate.git
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

## 📬 API Modules (Fases 1–9)

| Module        | Description                                  |
| ------------- | -------------------------------------------- |
| Auth          | Register, login, logout, refresh, 2FA        |
| Users         | Admin-only user listing, deletion, role edit |
| Roles         | Admin-defined access roles                   |
| Products      | Full CRUD with image support + pagination    |
| Categories    | CRUD categories linked to products           |
| Orders        | Cart checkout & admin status update          |
| Notifications | In-app alerts (read, delete)                 |
| Messages      | Private messages (send, read, threads)       |
| Bookmarks     | Save posts/products to favorites             |
| Media         | Upload & delete images via Cloudinary        |

---

## 🔒 Security Notes

- JWT & refresh token authentication
- Secure cookies (`httpOnly`, `SameSite`, `Secure`)
- Role-based access enforcement (`requireRole` middleware)
- Helmet, CORS, rate limiting, CSRF (optional)

---

## 📦 Roadmap

- 🔄 OAuth Login (Google, GitHub)
- 📊 Admin analytics dashboard
- 🌍 Multi-language support
- 🧾 Swagger documentation (OpenAPI)
- 🐳 Docker Compose (Mongo + Redis)
- 🧪 Full test coverage (Jest + Supertest)

---

## 🧑 Author

Created by [Deolindo Baptista](https://github.com/Deobap73) • SparkTech Lab
