"""
Projects API Routes for UnicornX OS
Phase 1: Project Management with Mind-Biome Integration
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
import uuid

from ..db.database import get_db
from ..db.models import Project, ProjectType, User
from .auth import get_current_user
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/api/v1/projects", tags=["projects"])

# Pydantic models
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    project_type: ProjectType
    color_scheme: Optional[str] = "#6366f1"
    metadata: Optional[dict] = None

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    project_type: Optional[ProjectType] = None
    color_scheme: Optional[str] = None
    metadata: Optional[dict] = None
    is_active: Optional[bool] = None
    is_archived: Optional[bool] = None

class ProjectResponse(BaseModel):
    id: UUID
    name: str
    description: Optional[str]
    project_type: ProjectType
    color_scheme: str
    metadata: Optional[dict]
    is_active: bool
    is_archived: bool
    created_at: datetime
    updated_at: datetime
    task_count: Optional[int] = 0

class ProjectStats(BaseModel):
    total_tasks: int
    completed_tasks: int
    in_progress_tasks: int
    total_effort_points: int
    completion_percentage: float

# Project endpoints
@router.post("/", response_model=ProjectResponse)
async def create_project(
    project_data: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new project"""
    db_project = Project(
        id=uuid.uuid4(),
        user_id=current_user.id,
        name=project_data.name,
        description=project_data.description,
        project_type=project_data.project_type,
        color_scheme=project_data.color_scheme,
        metadata=project_data.metadata,
        created_at=datetime.utcnow()
    )
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    return db_project

@router.get("/", response_model=List[ProjectResponse])
async def get_projects(
    include_archived: bool = False,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all projects for current user"""
    query = db.query(Project).filter(Project.user_id == current_user.id)
    
    if not include_archived:
        query = query.filter(Project.is_archived == False)
    
    projects = query.order_by(Project.updated_at.desc()).all()
    
    # Add task count for each project
    for project in projects:
        project.task_count = len(project.tasks)
    
    return projects

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific project"""
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == current_user.id
    ).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    project.task_count = len(project.tasks)
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: UUID,
    project_data: ProjectUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a project"""
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == current_user.id
    ).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    for field, value in project_data.dict(exclude_unset=True).items():
        setattr(project, field, value)
    
    project.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(project)
    
    project.task_count = len(project.tasks)
    return project

@router.delete("/{project_id}")
async def delete_project(
    project_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a project (archive it)"""
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == current_user.id
    ).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    project.is_archived = True
    project.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Project archived successfully"}

@router.get("/{project_id}/stats", response_model=ProjectStats)
async def get_project_stats(
    project_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get project statistics"""
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == current_user.id
    ).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    from ..db.models import TaskStatus
    
    tasks = project.tasks
    total_tasks = len(tasks)
    completed_tasks = len([t for t in tasks if t.status == TaskStatus.DONE])
    in_progress_tasks = len([t for t in tasks if t.status == TaskStatus.IN_PROGRESS])
    total_effort_points = sum([t.effort_points for t in tasks])
    
    completion_percentage = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    
    return ProjectStats(
        total_tasks=total_tasks,
        completed_tasks=completed_tasks,
        in_progress_tasks=in_progress_tasks,
        total_effort_points=total_effort_points,
        completion_percentage=completion_percentage
    )
