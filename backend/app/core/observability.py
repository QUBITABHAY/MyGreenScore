import time
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

# Setup basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("envfootprint")

class ObservabilityMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        
        logger.info(
            f"Path: {request.url.path} | Method: {request.method} | "
            f"Status: {response.status_code} | Latency: {process_time:.4f}s"
        )
        
        # Add custom header for debugging
        response.headers["X-Process-Time"] = str(process_time)
        return response

def log_agent_action(agent_name: str, action: str, details: dict):
    """
    Log specific agent actions for traceability.
    """
    logger.info(f"Agent: {agent_name} | Action: {action} | Details: {details}")
