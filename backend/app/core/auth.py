import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import get_settings

security = HTTPBearer()
settings = get_settings()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verifies the Clerk JWT token and returns the user_id (sub).
    """
    token = credentials.credentials
    
    try:
        # Verify the token using Clerk's public key
        # The key should be formatted as a proper PEM string in the environment variable
        # e.g., "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
        
        public_key = settings.CLERK_PEM_PUBLIC_KEY
        
        # If the key comes in as a single line (common in some env vars), fix the formatting
        if "-----BEGIN PUBLIC KEY-----" not in public_key:
             # Basic heuristic to fix formatting if needed, though best to store it correctly
             pass 
        
        payload = jwt.decode(token, key=public_key, algorithms=["RS256"])
        
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user_id
        
    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {e}",
            headers={"WWW-Authenticate": "Bearer"},
        )
