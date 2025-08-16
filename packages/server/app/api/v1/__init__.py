"""API V1 package exports"""
from .ai import router as ai_router  # re-export for convenience

__all__ = ["ai_router"]
