"""
Main FastAPI application with all routes
Updated to include task management endpoints
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from datetime import datetime

# Import route modules
from .api.v1.tasks import router as tasks_router

# สร้าง FastAPI instance
app = FastAPI(
    title="UnicornX OS API",
    description="API สำหรับ UnicornX OS - พันธมิตรผู้ร่วมสร้างการเติบโต",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(tasks_router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "UnicornX OS API",
        "version": "0.1.0",
        "status": "Phase 0: Foundation → Phase 1: Core MVP",
        "timestamp": datetime.now().isoformat(),
        "features": {
            "task_management": "✅ Available",
            "mind_biome": "🚧 In Development", 
            "skill_tree": "📋 Planned",
            "runner_agents": "📋 Planned"
        }
    }

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# API Routes
@app.get("/api/status")
async def get_system_status():
    return {
        "modules": {
            "mind_biome": {"status": "developing", "progress": 15},
            "catalyst_system": {"status": "developing", "progress": 40}, # ✅ Task API ready
            "skill_tree_symbiote": {"status": "planning", "progress": 5},
            "runner_agents": {"status": "planning", "progress": 0}
        },
        "phase": "Phase 1: Core MVP",
        "current_milestone": "Task Management API",
        "next_milestone": "Authentication & User Management",
        "database": "Models defined, migrations pending"
    }

# Catalyst System status endpoint
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
                "fragment_reactions": "🚧 Next"
            }
        },
        "endpoints": {
            "POST /api/v1/tasks": "Create new catalyst fragment",
            "GET /api/v1/tasks": "List fragments with filtering",
            "PUT /api/v1/tasks/{id}": "Update fragment",
            "POST /api/v1/tasks/{id}/complete": "Complete fragment & trigger growth"
        }
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
