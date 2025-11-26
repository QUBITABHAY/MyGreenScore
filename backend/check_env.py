from app.core.config import get_settings
try:
    settings = get_settings()
    print(f"GOOGLE_API_KEY present: {bool(settings.GOOGLE_API_KEY)}")
    print(f"GOOGLE_CSE_ID present: {bool(settings.GOOGLE_CSE_ID)}")
except Exception as e:
    print(f"Error loading settings: {e}")
