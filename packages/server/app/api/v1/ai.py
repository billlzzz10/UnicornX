from fastapi import APIRouter
from pydantic import BaseModel
from ...services.ai_client import query_ai

router = APIRouter(prefix="/api/v1/ai", tags=["ai"])


class QueryRequest(BaseModel):
    prompt: str
    max_tokens: int = 512


@router.post("/query")
async def query_endpoint(req: QueryRequest):
    # simple pass-through to provider
    result = query_ai(req.prompt, max_tokens=req.max_tokens)
    return {"ok": True, "provider": result.get('provider'), "response": result.get('response'), "sources": result.get('sources', [])}
