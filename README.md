# FIBO: Financial Intelligence & Banking Optimizer

This project is an enterprise-grade web application designed for financial inclusion. It assesses the repayment capacity of individuals and small businesses who lack traditional credit histories.

## Tech Stack
- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, React Router, Framer Motion
- **Backend**: FastAPI, Python 3.12+, SQLAlchemy, Alembic
- **Database**: PostgreSQL (Supabase)

## Phase 1: Project Initialization & Enterprise Foundation

This phase implements the clean architecture, UI scaffolding, routing, authentication UI, and backend configuration. It sets up the groundwork for subsequent phases that will introduce AI modeling and credit assessment logic.

### Directory Structure
- `/frontend`: Contains the Vite React TS application.
- `/backend`: Contains the FastAPI application.

### Setup Instructions

#### 1. Environment Configuration
Copy the `.env.example` to `.env` in both the root, frontend, and backend directories as needed. Fill in the Supabase URL, anon key, and database connection strings.

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

#### 3. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```
The backend API will be available at `http://localhost:8000` with interactive docs at `/docs`.
