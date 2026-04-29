# 🏠 Platinum Estate — Real Estate Web Portal

A full-stack real estate web portal built with **Spring Boot** (backend) and **Vite + React + Tailwind CSS** (frontend), connected to a **Neon PostgreSQL** cloud database.

---

## 📁 Project Structure

```
platinum_estate/
├── backend/                        # Spring Boot REST API
│   ├── src/main/java/com/real_estate_web/backend/
│   │   ├── admin/                  # Admin module
│   │   ├── bookings/               # Bookings module
│   │   ├── config/
│   │   │   ├── CorsConfig.java     # CORS configuration
│   │   │   └── SecurityConfig.java # Security configuration
│   │   ├── payments/               # Payments module
│   │   ├── property/               # Property listings module
│   │   ├── reviews/                # Reviews module
│   │   ├── users/                  # User management module
│   │   │   ├── User.java
│   │   │   ├── UserDTO.java
│   │   │   ├── UserRepository.java
│   │   │   ├── UserService.java
│   │   │   └── UserController.java
│   │   ├── BackendApplication.java
│   │   └── HomeController.java
│   ├── src/main/resources/
│   │   └── application.properties  # App configuration
│   ├── .env                        # Environment variables (DO NOT COMMIT)
│   └── pom.xml
│
├── frontend/                       # Vite + React + Tailwind CSS
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Homepage
│   │   │   ├── admin/
│   │   │   ├── booking/
│   │   │   ├── payments/
│   │   │   ├── property/
│   │   │   ├── reviews/
│   │   │   └── users/
│   │   │       ├── UserManagement.jsx
│   │   │       ├── UserTable.jsx
│   │   │       ├── UserModal.jsx
│   │   │       └── UserDeleteModal.jsx
│   │   ├── services/
│   │   │   ├── api.js              # Axios base instance
│   │   │   ├── adminService.js
│   │   │   ├── bookingService.js
│   │   │   ├── paymentService.js
│   │   │   ├── propertyService.js
│   │   │   ├── reviewService.js
│   │   │   └── userService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                        # Frontend env variables (DO NOT COMMIT)
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vite + React + Tailwind CSS v3 |
| Backend | Java 21 + Spring Boot 3.3.x |
| Database | Neon PostgreSQL (cloud) |
| HTTP Client | Axios |
| Build Tool | Maven |
| Version Control | Git + GitHub |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js v18+](https://nodejs.org/) and npm
- [Java 21](https://adoptium.net/)
- [Maven](https://maven.apache.org/) (or use the included `mvnw` wrapper)
- A [Neon](https://neon.tech) account with a PostgreSQL database

---

## 🗄️ Database Setup (Neon PostgreSQL)

1. Go to [console.neon.tech](https://console.neon.tech) and create a project named `platinum-estate`
2. Create a database named `realestate`
3. Open the **SQL Editor** and run the following:

```sql
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

4. Go to **Connection Details** → select **Java** → copy the JDBC connection string

---

## 🔧 Backend Setup (Spring Boot)

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Create your `.env` file

Create a file named `.env` in the `backend/` folder:

```env
DB_URL=jdbc:postgresql://<your-neon-host>/realestate?sslmode=require
DB_USERNAME=your_neon_username
DB_PASSWORD=your_neon_password
```

Replace the values with your actual Neon credentials.

### 3. Configure `application.properties`

Make sure `src/main/resources/application.properties` contains:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

server.port=8080
```

### 4. Run the backend

```bash
# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

### 5. Verify backend is running

Open your browser and go to:
```
http://localhost:8080/api/users
```
You should see a JSON array response.

---

## 🎨 Frontend Setup (Vite + React + Tailwind CSS)

### 1. Navigate to the frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Tailwind CSS v3 (if not already installed)

```bash
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
```

### 4. Verify `tailwind.config.js`

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 5. Verify `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 6. Verify `src/style.css` starts with

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 7. Run the frontend

```bash
npm run dev
```

### 8. Open in browser

```
http://localhost:5173
```

---

## 🔗 Connecting Frontend to Backend

The frontend communicates with the backend via Axios. The base URL is configured in `src/services/api.js`:

```js
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});
```

CORS is handled in `backend/src/main/java/com/real_estate_web/backend/config/CorsConfig.java` to allow requests from `http://localhost:5173`.

---

## 📜 Available Scripts

### Backend

```bash
./mvnw spring-boot:run        # Start backend server
./mvnw clean install          # Build the project
./mvnw test                   # Run tests
```

### Frontend

```bash
npm run dev         # Start development server (http://localhost:5173)
npm run build       # Build for production (outputs to dist/)
npm run preview     # Preview production build locally
```

---

## 🔒 Environment Variables

Never commit your `.env` files. They are already listed in `.gitignore`.

| File | Purpose |
|---|---|
| `backend/.env` | Neon DB credentials |
| `frontend/.env` | Frontend environment config |

---

## 🚫 .gitignore

Make sure your `.gitignore` includes:

```
# Environment files
.env
*.env

# Backend build
target/

# Frontend build
node_modules/
dist/

# IDE files
.idea/
*.iml
.vscode/
```

---

## 🛠️ Common Issues & Fixes

| Error | Fix |
|---|---|
| `CORS blocked` | Restart backend, check `CorsConfig.java` allows port 5173 |
| `403 Forbidden` | Disable Spring Security or permit all requests in `SecurityConfig.java` |
| `axios not found` | Run `npm install axios` in frontend folder |
| `Tailwind not working` | Make sure `tailwindcss@3` is installed, not v4 |
| `Cannot connect to DB` | Check `.env` credentials and Neon connection string |
| `Port 8080 in use` | Kill the existing process or change `server.port` in `application.properties` |

---

## 📄 License

This project is built for academic purposes as part of a group assignment.