# MyGreenScore - Environmental Footprint Backend (Capstone)

A Multi-Agent System to calculate environmental footprints, track goals, and provide personalized sustainability suggestions. Built for the Kaggle Agentic AI Capstone.

## Key Features (Capstone)
-   **Multi-Agent Architecture**: Classifier, Calculator, Suggestion, and Memory Agents.
-   **Memory & Context**: Long-term user memory (goals, preferences) and session management.
-   **Observability**: Request latency tracking and agent decision logging.
-   **Dashboard & Privacy**: Stats, trends, and full data export/deletion capabilities.

## Setup

1.  **Clone the repository**.
2.  **Create a virtual environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    pip install pytest
    ```
4.  **Environment Variables**:
    Copy `.env` template and fill in your keys:
    ```bash
    cp .env .env.local
    # Edit .env.local with OPENAI_API_KEY, GOOGLE_API_KEY, GOOGLE_CSE_ID
    ```
    *Note: Ensure you have a running PostgreSQL instance or use Docker.*

5.  **Run Database (Docker)**:
    ```bash
    docker-compose up -d
    ```

## Running the Application

Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.
Documentation: `http://localhost:8000/docs`.

## Testing

Run the automated agent evaluation tests:
```bash
pytest tests/test_agents.py
```

## Architecture

-   **Coordinator Agent**: Orchestrates the flow.
-   **Classifier Agent**: Categorizes input items.
-   **Calculator Agent**: Researches and calculates CO2e.
-   **Suggestion Agent**: Generates personalized tips.
-   **Memory Agent**: Manages long-term user context.

