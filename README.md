# Pokémon Simulator Project

## 📖 Description

The Pokémon Simulator is a Node.js-based application designed to simulate various interactions and mechanics found in the Pokémon universe.

## 🚀 Getting Started

These instructions guide you on how to get the application running locally using Node.js/TypeScript via Docker.

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker and Docker Compose installed and running

### Option 2: Docker Setup (Recommended for stable deployment)

For the easiest and most reproducible setup, use Docker Compose to manage all services (application, database, etc.).

1.  **Build Images:**
    This command builds all necessary service images defined in `docker-compose.yml`.

    ```bash
    docker compose build
    ```

2.  **Run Services:**
    Start the entire stack and wait for the application to initialize.

    ```bash
    # --build ensures latest code is used even if images were previously built
    docker compose up --build
    ```

3.  **Accessing the Simulator:**
    After services are running, access the simulator via its configured port (e.g., `http://localhost:3000`).

---

## ✨ Usage Tips

- `/simulate` will simulate a battle and return the logs of a current battle
- `/history` will return the history of all the battles.
