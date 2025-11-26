from app.agents.classifier import classifier_agent
from app.agents.calculator_agent import calculator_agent
from app.agents.suggestion_agent import suggestion_agent
from app.agents.memory_agent import get_user_context, save_memory_log
from app.agents.tools import db_writer_tool
from app.core.memory import InMemorySessionService
from app.core.observability import log_agent_action

async def coordinator_agent(user_id: str, items: list):
    """
    CoordinatorAgent orchestrates the flow:
    Input -> Memory Check -> Classify -> Calculate -> Suggest -> Update Memory.
    """
    results = []
    
    # 1. Get User Context (Long-term + Session)
    user_context = await get_user_context(user_id)
    session = InMemorySessionService.get_session(user_id)
    
    for item in items:
        item_name = item["item_name"]
        quantity = item["quantity"]
        unit = item["unit"]
        
        # 2. Classify
        classification = await classifier_agent(item_name)
        category = classification.get("category", "Other")
        confidence = classification.get("confidence", 0.0)
        log_agent_action("Classifier", "Classified Item", {"item": item_name, "category": category})
        
        # 3. Calculate CO2e
        calc_result = await calculator_agent(item_name, quantity, unit, category)
        total_co2e = calc_result.get("co2e_kg", 0)
        
        # 4. Get Suggestions (with personalization)
        suggestions = await suggestion_agent(item_name, user_context)
        
        # 5. Write to DB
        await db_writer_tool(
            user_id=user_id,
            item_name=item_name,
            quantity=quantity,
            unit=unit,
            co2e_kg=total_co2e,
            suggestions=suggestions,
            category=category,
            classification_confidence=confidence
        )
        
        # 6. Update Memory
        InMemorySessionService.add_history(user_id, f"User added {quantity} {unit} of {item_name}", "user")
        InMemorySessionService.add_history(user_id, f"Calculated {total_co2e} kg CO2e", "assistant")
        await save_memory_log(user_id, "system", f"Processed {item_name}: {total_co2e}kg CO2e")
        
        results.append({
            "item": item_name,
            "category": category,
            "co2e_kg": total_co2e,
            "suggestions": suggestions
        })
        
    total_session_co2e = sum(r["co2e_kg"] for r in results)
    return {"status": "success", "results": results, "total_co2e_kg": total_session_co2e}
