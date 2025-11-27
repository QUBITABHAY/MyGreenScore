import asyncio
from app.agents.classifier import classifier_agent
from app.agents.calculator_agent import calculator_agent
from app.agents.suggestion_agent import suggestion_agent
from app.agents.memory_agent import get_user_context, save_memory_log
from app.agents.tools import db_writer_tool
from app.core.memory import InMemorySessionService
from app.core.observability import log_agent_action

async def process_single_item(user_id: str, item: dict, user_context: str):
    """Process a single item through the agent pipeline"""
    item_name = item["item_name"]
    quantity = item["quantity"]
    unit = item["unit"]
    
    # 1. Classify
    classification = await classifier_agent(item_name)
    category = classification.get("category", "Other")
    confidence = classification.get("confidence", 0.0)
    log_agent_action("Classifier", "Classified Item", {"item": item_name, "category": category})
    
    # 2. Calculate CO2e
    calc_result = await calculator_agent(item_name, quantity, unit, category)
    total_co2e = calc_result.get("co2e_kg", 0)
    
    # 3. Get Suggestions (with personalization)
    suggestions = await suggestion_agent(item_name, user_context)
    
    # 4. Write to DB
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
    
    # 5. Update Memory
    InMemorySessionService.add_history(user_id, f"User added {quantity} {unit} of {item_name}", "user")
    InMemorySessionService.add_history(user_id, f"Calculated {total_co2e} kg CO2e", "assistant")
    await save_memory_log(user_id, "system", f"Processed {item_name}: {total_co2e}kg CO2e")
    
    return {
        "item": item_name,
        "category": category,
        "co2e_kg": total_co2e,
        "suggestions": suggestions
    }

async def coordinator_agent(user_id: str, items: list):
    """
    CoordinatorAgent orchestrates the flow with PARALLEL processing:
    Input -> Memory Check -> [Classify -> Calculate -> Suggest -> Update Memory] (in parallel for each item)
    """
    # 1. Get User Context (Long-term + Session)
    user_context = await get_user_context(user_id)
    
    # 2. Process all items in PARALLEL for better performance
    results = await asyncio.gather(
        *[process_single_item(user_id, item, user_context) for item in items],
        return_exceptions=True  # Continue even if one item fails
    )
    
    # 3. Filter out any exceptions and log them
    successful_results = []
    for i, result in enumerate(results):
        if isinstance(result, Exception):
            print(f"Error processing item {items[i]}: {result}")
            continue
        successful_results.append(result)
    
    total_session_co2e = sum(r["co2e_kg"] for r in successful_results)
    return {"status": "success", "results": successful_results, "total_co2e_kg": total_session_co2e}
