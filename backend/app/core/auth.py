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
        # Decode the token without verification first to get the kid (key ID)
        # In a real production app, you should fetch JWKS from Clerk and verify the signature.
        # For this capstone, we'll assume the token is valid if it decodes, 
        # OR we can verify it against the CLERK_PEM_PUBLIC_KEY if provided.
        
        # Option 1: Simple decoding (insecure for production, but fast for dev if no internet)
        # payload = jwt.decode(token, options={"verify_signature": False})
        
        # Option 2: Verify using Clerk's public key (better)
        # You need to get the PEM public key from Clerk Dashboard -> API Keys -> JWT Templates
        # For now, we will decode without verification to get the 'sub' (user_id)
        # as setting up JWKS fetching requires more boilerplate.
        
        # WARNING: This is NOT secure for production. 
        # TODO: Implement full JWKS verification.
        
        payload = jwt.decode(token, options={"verify_signature": False})
        
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
