"""
Dashboard API Routes for UnicornX OS
Phase 1: Analytics, Mind-Biome Data, Productivity Insights
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from uuid import UUID

from ..db.database import get_db
from ..db.models import User, Project, Task, TaskStatus
from .auth import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])

# Pydantic models
class DashboardOverview(BaseModel):
    total_projects: int
    active_projects: int
    total_tasks: int
    completed_tasks_today: int
    in_progress_tasks: int
    total_effort_points: int
    productivity_score: float
    streak_days: int

class MindBiomeData(BaseModel):
    energy_level: float
    focus_score: float
    mood_indicator: str
    productivity_patterns: Dict[str, Any]
    recent_activities: List[Dict[str, Any]]

class WeeklyStats(BaseModel):
    week_start: datetime
    completed_tasks: int
    effort_points_earned: int
    productivity_score: float
    focus_sessions: int

class TaskTrend(BaseModel):
    date: datetime
    completed: int
    created: int
    effort_points: int

class ProductivityInsight(BaseModel):
    insight_type: str
    title: str
    description: str
    recommendation: str
    impact_score: float
    data: Optional[Dict[str, Any]] = None

# Dashboard endpoints
@router.get("/overview", response_model=DashboardOverview)
async def get_dashboard_overview(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard overview statistics"""
    today = datetime.now().date()
    
    # Project stats
    total_projects = db.query(Project).filter(
        Project.user_id == current_user.id,
        Project.is_archived == False
    ).count()
    
    active_projects = db.query(Project).filter(
        Project.user_id == current_user.id,
        Project.is_active == True,
        Project.is_archived == False
    ).count()
    
    # Task stats
    total_tasks = db.query(Task).filter(Task.user_id == current_user.id).count()
    
    completed_tasks_today = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.status == TaskStatus.DONE,
        func.date(Task.updated_at) == today
    ).count()
    
    in_progress_tasks = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.status == TaskStatus.IN_PROGRESS
    ).count()
    
    # Effort points
    total_effort_points = db.query(func.sum(Task.effort_points)).filter(
        Task.user_id == current_user.id,
        Task.status == TaskStatus.DONE
    ).scalar() or 0
    
    # Calculate productivity score (simple algorithm)
    weekly_completed = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.status == TaskStatus.DONE,
        Task.updated_at >= datetime.now() - timedelta(days=7)
    ).count()
    
    productivity_score = min(100, (weekly_completed * 10) + (completed_tasks_today * 5))
    
    # Calculate streak (simplified)
    streak_days = 0  # TODO: Implement proper streak calculation
    
    return DashboardOverview(
        total_projects=total_projects,
        active_projects=active_projects,
        total_tasks=total_tasks,
        completed_tasks_today=completed_tasks_today,
        in_progress_tasks=in_progress_tasks,
        total_effort_points=total_effort_points,
        productivity_score=productivity_score,
        streak_days=streak_days
    )

@router.get("/mind-biome", response_model=MindBiomeData)
async def get_mind_biome_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get Mind-Biome visualization data"""
    # Calculate current metrics based on recent activity
    recent_tasks = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.updated_at >= datetime.now() - timedelta(days=7)
    ).all()
    
    # Simple algorithms for demo
    completed_count = len([t for t in recent_tasks if t.status == TaskStatus.DONE])
    energy_level = min(100, (completed_count * 10) + 30)
    focus_score = min(100, (completed_count * 8) + 40)
    
    mood_indicator = "focused" if focus_score > 70 else "scattered" if focus_score > 40 else "low_energy"
    
    productivity_patterns = {
        "peak_hours": ["09:00", "14:00", "19:00"],
        "energy_curve": [30, 60, 85, 90, 70, 80, 60, 40],
        "focus_periods": ["morning", "afternoon"]
    }
    
    recent_activities = [
        {
            "type": "task_completed",
            "title": task.title,
            "timestamp": task.updated_at,
            "effort_points": task.effort_points
        }
        for task in recent_tasks[-5:] if task.status == TaskStatus.DONE
    ]
    
    return MindBiomeData(
        energy_level=energy_level,
        focus_score=focus_score,
        mood_indicator=mood_indicator,
        productivity_patterns=productivity_patterns,
        recent_activities=recent_activities
    )

@router.get("/trends", response_model=List[TaskTrend])
async def get_task_trends(
    days: int = 7,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get task completion trends over time"""
    trends = []
    
    for i in range(days):
        date = datetime.now().date() - timedelta(days=i)
        
        completed = db.query(Task).filter(
            Task.user_id == current_user.id,
            Task.status == TaskStatus.DONE,
            func.date(Task.updated_at) == date
        ).count()
        
        created = db.query(Task).filter(
            Task.user_id == current_user.id,
            func.date(Task.created_at) == date
        ).count()
        
        effort_points = db.query(func.sum(Task.effort_points)).filter(
            Task.user_id == current_user.id,
            Task.status == TaskStatus.DONE,
            func.date(Task.updated_at) == date
        ).scalar() or 0
        
        trends.append(TaskTrend(
            date=datetime.combine(date, datetime.min.time()),
            completed=completed,
            created=created,
            effort_points=effort_points
        ))
    
    return list(reversed(trends))

@router.get("/insights", response_model=List[ProductivityInsight])
async def get_productivity_insights(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get AI-powered productivity insights"""
    insights = []
    
    # Analyze recent patterns
    recent_tasks = db.query(Task).filter(
        Task.user_id == current_user.id,
        Task.updated_at >= datetime.now() - timedelta(days=7)
    ).all()
    
    completed_tasks = [t for t in recent_tasks if t.status == TaskStatus.DONE]
    blocked_tasks = [t for t in recent_tasks if t.status == TaskStatus.BLOCKED]
    
    # Insight 1: Completion rate
    if len(recent_tasks) > 0:
        completion_rate = len(completed_tasks) / len(recent_tasks)
        if completion_rate < 0.6:
            insights.append(ProductivityInsight(
                insight_type="productivity",
                title="ลดขนาดงานลง",
                description=f"คุณทำงานเสร็จได้เพียง {completion_rate:.1%} ในสัปดาห์ที่ผ่านมา",
                recommendation="ลองแบ่งงานใหญ่ออกเป็นชิ้นเล็กๆ เพื่อเพิ่มโอกาสในการทำสำเร็จ",
                impact_score=8.5
            ))
    
    # Insight 2: Blocked tasks
    if len(blocked_tasks) > 2:
        insights.append(ProductivityInsight(
            insight_type="workflow",
            title="จัดการงานที่ติดขัด",
            description=f"คุณมีงาน {len(blocked_tasks)} งานที่ติดขัด",
            recommendation="ลองระบุสาเหตุที่ทำให้งานติดขัด และหาวิธีแก้ไขหรือขอความช่วยเหลือ",
            impact_score=7.2
        ))
    
    # Insight 3: Energy patterns (mock data)
    insights.append(ProductivityInsight(
        insight_type="energy",
        title="ช่วงเวลาที่มีพลังที่สุด",
        description="คุณมักทำงานได้ดีที่สุดในช่วงเช้า (9-11 โมง)",
        recommendation="จัดเรียงงานที่ต้องใช้สมาธิสูงไว้ในช่วงเวลานี้",
        impact_score=9.1,
        data={"peak_hours": ["09:00", "10:00", "11:00"]}
    ))
    
    return insights

@router.get("/weekly-stats", response_model=List[WeeklyStats])
async def get_weekly_stats(
    weeks: int = 4,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get weekly productivity statistics"""
    stats = []
    
    for i in range(weeks):
        week_start = datetime.now().date() - timedelta(weeks=i)
        week_end = week_start + timedelta(days=7)
        
        completed_tasks = db.query(Task).filter(
            Task.user_id == current_user.id,
            Task.status == TaskStatus.DONE,
            func.date(Task.updated_at) >= week_start,
            func.date(Task.updated_at) < week_end
        ).count()
        
        effort_points = db.query(func.sum(Task.effort_points)).filter(
            Task.user_id == current_user.id,
            Task.status == TaskStatus.DONE,
            func.date(Task.updated_at) >= week_start,
            func.date(Task.updated_at) < week_end
        ).scalar() or 0
        
        productivity_score = min(100, (completed_tasks * 8) + (effort_points * 2))
        
        stats.append(WeeklyStats(
            week_start=datetime.combine(week_start, datetime.min.time()),
            completed_tasks=completed_tasks,
            effort_points_earned=effort_points,
            productivity_score=productivity_score,
            focus_sessions=completed_tasks  # Simplified
        ))
    
    return list(reversed(stats))
