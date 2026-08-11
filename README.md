# FloatChat 🚀

> **FloatChat** – A modern, real‑time chat application built with **FastAPI**, **React**, and **TypeScript**. Designed for researchers and administrators to collaborate on datasets, visualize results, and manage security events.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **User Management** – Role‑based authentication for Admin and Researcher users.
- **Dataset Handling** – Upload, store, and query large research datasets.
- **Chat History** – Persisted chat sessions with searchable history.
- **Visualization** – Interactive data visualizations for research insights.
- **Security Auditing** – Detailed logs for security events and audit trails.
- **CORS & Security Headers** – Ready for deployment behind modern front‑ends.

---

## Tech Stack
| Layer | Technology |
|-------|-------------|
| Backend | FastAPI, SQLAlchemy, Pydantic |
| Database | SQLite (default) – can be swapped for PostgreSQL |
| Frontend | Vite + React (TypeScript) |
| Styling | Tailwind CSS |
| Auth | JWT + Password hashing |
| Dev Tools | npm, pip, venv |

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/DharunTeja/FloatChat.git
cd FloatChat
```

### 2. Backend Setup
Create a virtual environment and install backend dependencies:
```bash
# Set up a virtual environment
python -m venv .venv

# Activate the environment (Windows)
.venv\Scripts\activate

# Activate the environment (macOS/Linux)
source .venv/bin/activate

# Install backend dependencies
pip install -r backend/requirements.txt
```

### 3. Environment Configuration
Copy the template `.env` file in the `backend` directory and add your secret keys:
```bash
cp backend/.env.example backend/.env
```
Open `backend/.env` and update the values for `SECRET_KEY`, `SECURITY_LOG_PASSKEY`, and optionally `GROQ_API_KEY`.

### 4. Frontend Setup
Install frontend dependencies:
```bash
cd frontend
npm install
```

---

## Running the Application

### 1. Start the Backend API
From the project root directory, run:
```bash
# Ensure your virtual environment is activated
uvicorn backend.main:app --reload
```

### 2. Start the Frontend Dev Server
In a new terminal window:
```bash
cd frontend
npm run dev
```

The Backend API will be available at `http://localhost:8000` and the Frontend UI at `http://localhost:5173`.

---

## API Documentation
FastAPI automatically generates interactive docs:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/your-feature`).
3. Ensure all changes are properly linted and formatted.
4. Submit a pull request with a clear description.

---

## License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ by the FloatChat team.*
