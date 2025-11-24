# Focus GTD

A Getting Things Done (GTD) compliant to-do list application built with React, TypeScript, and Vite.

## Features

- **GTD Workflow**: Capture, Clarify, Organize, Reflect, Engage.
- **Inbox**: Quick capture for all your thoughts and tasks.
- **Projects**: Organize multi-step tasks into projects with custom colors.
- **Contexts**: Filter tasks by context (e.g., @home, @work).
- **Weekly Review**: A guided wizard to help you review your system weekly.
- **Views**:
  - **List View**: Standard list for Inbox, Next Actions, etc.
  - **Board View**: Kanban-style drag-and-drop board.
  - **Calendar View**: Schedule and view tasks on a calendar.
- **Local First**: Data is stored locally in `data.json`.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- @dnd-kit (Drag and Drop)
- date-fns
- Express (Backend for local file persistence)

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    This will start both the frontend (Vite) and the backend server concurrently.

3.  **Open the App**:
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Data Persistence

Tasks and projects are saved to `data.json` in the project root. This file can be synced across devices using tools like Syncthing.
