from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from datetime import datetime

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

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "UnicornX OS API",
        "version": "0.1.0",
        "status": "Phase 0: Foundation",
        "timestamp": datetime.now().isoformat()
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
            "mind_biome": {"status": "developing", "progress": 10},
            "catalyst_system": {"status": "planning", "progress": 5},
            "skill_tree_symbiote": {"status": "planning", "progress": 0},
            "runner_agents": {"status": "planning", "progress": 0}
        },
        "phase": "Foundation",
        "next_milestone": "Basic Task Management"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
