# MyGreenScore Backend

## Local Development

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Run database migrations (first time only):
```bash
python -c "from app.core.db import init_db; import asyncio; asyncio.run(init_db())"
```

5. Start server:
```bash
uvicorn app.main:app --reload
```

API will be available at `http://localhost:8000`
Interactive docs at `http://localhost:8000/docs`

## Production Deployment (Render)

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed instructions.

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `POST /api/assess` - Submit carbon footprint data
- `GET /api/dashboard/stats` - Get user statistics
- `GET /api/dashboard/trends` - Get emission trends
- `GET /api/goals/` - Get user goals
- `POST /api/goals/` - Create new goal
- `GET /api/privacy/export` - Export user data
- `DELETE /api/privacy/data` - Delete all user data
- `GET /api/quotes/daily` - Get daily sustainability quote
- `GET /api/user/me` - Get user profile
- `POST /api/user/complete-onboarding` - Mark onboarding complete

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_API_KEY` - Google Gemini API key
- `CLERK_PEM_PUBLIC_KEY` - Clerk authentication public key

Optional:
- `GOOGLE_CSE_ID` - Google Custom Search Engine ID
- `CORS_ORIGINS` - Comma-separated list of allowed origins
