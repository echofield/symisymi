SYMI OS - Frontend Dashboard
This is the Next.js frontend for SYMI OS, a FIaaS (Foundational Intelligence as a Service) platform designed to be a "Business Twin" for coaches, consultants, and knowledge workers. It provides an intelligent interface to track client progress, manage content, and leverage a suite of AI agents.

🚀 Features
Main Dashboard: An at-a-glance view of all key business metrics, including client progress, engagement, and recent activity.

Clients Command Center: A two-panel layout to manage a list of clients and view detailed progress for a selected individual.

Content Hub: A card-based UI to organize and manage tiered content for different client levels (Public, Standard, Premium).

Agent Command Center: A fully functional chat interface that connects to a live Python backend to interact with specialized AI agents.

✨ Tech Stack
Frontend: Next.js (App Router), React, Tailwind CSS, recharts, lucide-react.

Backend: Python, FastAPI, uvicorn, openai.

🛠️ Getting Started
This is a full-stack project with a decoupled frontend and backend. You will need to run two separate servers.

Prerequisites
Node.js (v18 or later)

Python (v3.9 or later)

1. Backend Setup (python_api)
First, start the Python server which runs the AI agents.

Navigate to the backend directory:

Bash

cd path/to/your/python_api
Install dependencies:

Bash

pip install -r requirements.txt
Create your environment file: Create a file named .env and add your secret keys:

OPENAI_API_KEY=sk-...
Run the server:

Bash

python -m uvicorn main:app --reload
The backend will be running at http://127.0.0.1:8000.

2. Frontend Setup (dashboardtemplate-master)
Next, start the Next.js frontend in a new terminal window.

Navigate to the frontend directory:

Bash

cd path/to/your/dashboardtemplate-master
Install dependencies:

Bash

npm install
Create your local environment file: Create a file named .env.local and add your keys. The NEXT_PUBLIC_API_URL should point to your local backend server.

GEMINI_API_KEY=Aiza...
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
Run the development server:

Bash

npm run dev
Open http://localhost:3000 with your browser to see the result.

🌐 Deployment
The application is deployed as two separate services:

The frontend is deployed on Vercel.

The backend is deployed on Render.

Environment variables must be configured in both Vercel and Render for the live application to function correctly.