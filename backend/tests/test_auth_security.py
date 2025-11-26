import pytest
import jwt
from fastapi import HTTPException
from unittest.mock import MagicMock, patch
from app.core.auth import get_current_user

# Generate a temporary RSA key pair for testing
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)
public_key = private_key.public_key()

pem_private = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption()
)

pem_public = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)

@pytest.mark.asyncio
async def test_get_current_user_valid_token():
    # Create a valid token signed with our private key
    token = jwt.encode({"sub": "user_123"}, pem_private, algorithm="RS256")
    
    # Mock settings to return our public key
    with patch("app.core.auth.settings") as mock_settings:
        mock_settings.CLERK_PEM_PUBLIC_KEY = pem_public.decode("utf-8")
        
        credentials = MagicMock()
        credentials.credentials = token
        
        user_id = await get_current_user(credentials)
        assert user_id == "user_123"

@pytest.mark.asyncio
async def test_get_current_user_invalid_signature():
    # Create a token signed with a DIFFERENT key (or just random garbage signature)
    # Here we just sign with a new random key
    other_private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    other_pem_private = other_private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )
    
    token = jwt.encode({"sub": "user_123"}, other_pem_private, algorithm="RS256")
    
    with patch("app.core.auth.settings") as mock_settings:
        mock_settings.CLERK_PEM_PUBLIC_KEY = pem_public.decode("utf-8")
        
        credentials = MagicMock()
        credentials.credentials = token
        
        with pytest.raises(HTTPException) as excinfo:
            await get_current_user(credentials)
        
        assert excinfo.value.status_code == 401
        assert "Could not validate credentials" in excinfo.value.detail

@pytest.mark.asyncio
async def test_get_current_user_no_sub():
    # Token with valid signature but missing 'sub'
    token = jwt.encode({"foo": "bar"}, pem_private, algorithm="RS256")
    
    with patch("app.core.auth.settings") as mock_settings:
        mock_settings.CLERK_PEM_PUBLIC_KEY = pem_public.decode("utf-8")
        
        credentials = MagicMock()
        credentials.credentials = token
        
        with pytest.raises(HTTPException) as excinfo:
            await get_current_user(credentials)
        
        assert excinfo.value.status_code == 401
        assert "Invalid authentication credentials" in excinfo.value.detail
