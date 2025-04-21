# Local Development Environment Setup

This document outlines the steps to set up and run the integrated local development environment for the Video Training Funnel project. This setup runs both the frontend (React) and backend (Node.js) servers concurrently, enabling live reloading for frontend changes and automatic restarts for backend changes.

## Prerequisites

Ensure you have the following installed:

*   Node.js (v14+ recommended, check `README.md` for specific version if updated)
*   npm (usually comes with Node.js)
*   Git
*   MongoDB (running locally or accessible via connection string)

## Installation

1.  **Clone the Repository:**
    If you haven't already, clone the project repository:
    ```bash
    git clone https://github.com/your-organization/video-training-funnel.git
    cd video-training-funnel
    ```

2.  **Install Dependencies:**
    Navigate to the project's root directory (the one containing this `DEVELOPMENT.md` file) and run the following command. This will install the root development tools (`concurrently`) and then automatically trigger the installation of dependencies within both the `frontend` and `backend` directories via the `postinstall` script in the root `package.json`.
    ```bash
    npm install
    ```
    *Note: If you encounter issues with `postinstall`, you can manually install dependencies:*
    ```bash
    # From the root directory
    npm install
    cd frontend
    npm install
    cd ../backend
    npm install
    cd .. 
    ```

3.  **Configure Backend Environment:**
    Navigate to the `backend` directory, copy the example environment file, and update it with your specific settings (like database connection string, JWT secret, etc.).
    ```bash
    cd backend
    cp .env.example .env
    # Open .env in your editor and add your configuration values
    # Ensure PORT is set if you don't want the default 3001
    cd ..
    ```

## Running the Development Server

Once installation and configuration are complete, you can start the development environment from the **project root directory** using a single command:

```bash
npm run dev
```

This command will:

*   Start the backend server using `nodemon` (typically on port 3001, defined in `backend/.env` or defaulting in `backend/server.js`). It will automatically restart if backend files are changed.
*   Start the frontend development server using `react-scripts` (typically on port 3000). It will automatically reload the browser page when frontend files are changed.
*   Proxy API requests made from the frontend (e.g., to `/api/...`) to the backend server running on port 3001 (or the configured port).

You should see output from both servers in your terminal. Access the frontend application by opening your browser to `http://localhost:3000` (or the port indicated by the React development server output).

## Stopping the Development Server

Press `Ctrl + C` in the terminal where `npm run dev` is running. Concurrently will shut down both the frontend and backend processes.