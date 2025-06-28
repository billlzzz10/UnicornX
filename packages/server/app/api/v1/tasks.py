"""
API Routes for Task Management (Catalyst System)
Phase 1: Basic CRUD Operations
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
import uuid

from ..db.database import get_db
from ..db.models import Task, TaskStatus, User, Project
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/api/v1/tasks", tags=["tasks"])

# Pydantic models for API
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    project_id: UUID
    effort_points: Optional[int] = 1
    complexity_level: Optional[int] = 1
    due_date: Optional[datetime] = None
    estimated_duration: Optional[int] = None
    required_energy_level: Optional[int] = 3
    required_mood: Optional[str] = "focused"

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    effort_points: Optional[int] = None
    complexity_level: Optional[int] = None
    due_date: Optional[datetime] = None
    estimated_duration: Optional[int] = None
    actual_duration: Optional[int] = None
    required_energy_level: Optional[int] = None
    required_mood: Optional[str] = None

class TaskResponse(BaseModel):
    id: UUID
    title: str
    description: Optional[str]
    status: TaskStatus
    project_id: UUID
    effort_points: int
    complexity_level: int
    due_date: Optional[datetime]
    estimated_duration: Optional[int]
    actual_duration: Optional[int]
    required_energy_level: int
    required_mood: str
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Temporary user dependency (will be replaced with proper auth)
async def get_current_user():
    # TODO: Implement proper authentication
    return {"id": uuid.uuid4(), "username": "demo_user"}

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new task (Catalyst Fragment)
    """
    db_task = Task(
        title=task.title,
        description=task.description,
        project_id=task.project_id,
        user_id=current_user["id"],
        effort_points=task.effort_points,
        complexity_level=task.complexity_level,
        due_date=task.due_date,
        estimated_duration=task.estimated_duration,
        required_energy_level=task.required_energy_level,
        required_mood=task.required_mood,
        is_catalyst_fragment=True
    )
    
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    
    return db_task

@router.get("/", response_model=List[TaskResponse])
async def get_tasks(
    project_id: Optional[UUID] = None,
    status: Optional[TaskStatus] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Get tasks with optional filtering
    """
    query = db.query(Task).filter(Task.user_id == current_user["id"])
    
    if project_id:
        query = query.filter(Task.project_id == project_id)
    
    if status:
        query = query.filter(Task.status == status)
    
    tasks = query.offset(skip).limit(limit).all()
    return tasks

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Get a specific task by ID
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["id"]
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return task

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: UUID,
    task_update: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Update a task
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["id"]
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    # Update fields
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    # Set completion timestamp if status changed to DONE
    if task_update.status == TaskStatus.DONE and task.status != TaskStatus.DONE:
        task.completed_at = datetime.utcnow()
    
    task.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(task)
    
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Delete a task
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["id"]
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    db.delete(task)
    db.commit()

@router.post("/{task_id}/complete", response_model=TaskResponse)
async def complete_task(
    task_id: UUID,
    actual_duration: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Mark a task as completed and trigger Mind-Biome growth
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["id"]
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    task.status = TaskStatus.DONE
    task.completed_at = datetime.utcnow()
    task.updated_at = datetime.utcnow()
    
    if actual_duration:
        task.actual_duration = actual_duration
    
    # TODO: Trigger Mind-Biome object creation
    # TODO: Award experience points to related skills
    
    db.commit()
    db.refresh(task)
    
    return task
