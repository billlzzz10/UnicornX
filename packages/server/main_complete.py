"""
Unified UnicornX OS Backend API entrypoint

This file consolidates routers and status endpoints into a single canonical app.
"""

from datetime import datetime
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

# Import route modules (absolute imports consistent with package layout)
from app.api.v1 import auth, projects, tasks, dashboard
from app.api.v1.ai import router as ai_router


# Create FastAPI app
app = FastAPI(
    title="UnicornX OS API",
    description="Backend API for UnicornX OS - พันธมิตรผู้ร่วมสร้างการเติบโต",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# CORS middleware - allow local frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security middleware - trusted hosts
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "*.unicornx.com"],
)


# Include routers
app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(tasks.router)
app.include_router(dashboard.router)
app.include_router(ai_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to UnicornX OS API",
        "version": app.version,
        "docs": app.docs_url,
        "status": "running",
        "timestamp": datetime.now().isoformat(),
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "UnicornX OS API", "timestamp": datetime.now().isoformat()}


@app.get("/api/status")
async def get_system_status():
    return {
        "modules": {
            "mind_biome": {"status": "developing", "progress": 15},
            "catalyst_system": {"status": "developing", "progress": 40},
            "skill_tree_symbiote": {"status": "planning", "progress": 5},
            "runner_agents": {"status": "planning", "progress": 0},
        },
        "phase": "Phase 1: Core MVP",
        "current_milestone": "Task Management API",
        "next_milestone": "Authentication & User Management",
        "database": "Models defined, migrations pending",
        "timestamp": datetime.now().isoformat(),
    }


@app.get("/api/catalyst/status")
async def get_catalyst_status():
    return {
        "catalyst_system": {
            "status": "operational",
            "features": {
                "task_creation": "✅ Ready",
                "task_updates": "✅ Ready",
                "task_completion": "✅ Ready",
                "recursive_decomposition": "🚧 Next",
                "fragment_reactions": "🚧 Next",
            },
        },
        "endpoints": {
            "POST /api/v1/tasks": "Create new catalyst fragment",
            "GET /api/v1/tasks": "List fragments with filtering",
            "PUT /api/v1/tasks/{id}": "Update fragment",
            "POST /api/v1/tasks/{id}/complete": "Complete fragment & trigger growth",
        },
        "timestamp": datetime.now().isoformat(),
    }


if __name__ == "__main__":
    # Run with: python main_complete.py
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True, log_level="info")
