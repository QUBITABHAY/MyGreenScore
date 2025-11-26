from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from app.agents.coordinator import coordinator_agent
from app.core.auth import get_current_user

router = APIRouter()

class Item(BaseModel):
    item_name: str
    quantity: float
    unit: str

class AssessRequest(BaseModel):
    items: List[Item]

@router.post("/assess")
async def assess_footprint(request: AssessRequest, user_id: str = Depends(get_current_user)):
    try:
        # Convert Pydantic models to list of dicts for the coordinator
        items_data = [item.dict() for item in request.items]
        result = await coordinator_agent(user_id, items_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
