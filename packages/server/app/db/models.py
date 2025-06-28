"""
Database Models for UnicornX OS
Phase 1: Foundation Models
"""

from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from datetime import datetime
import uuid
import enum

Base = declarative_base()

class TaskStatus(enum.Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress" 
    DONE = "done"
    BLOCKED = "blocked"

class ProjectType(enum.Enum):
    WRITING = "writing"
    DEVELOPMENT = "development"
    BUSINESS = "business"
    PERSONAL = "personal"

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(100), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    
    # Profile & Preferences
    onboarding_data = Column(JSONB)  # ADHD preferences, work style, etc.
    timezone = Column(String(50), default="UTC")
    avatar_url = Column(String(500))
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime)
    
    # Status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Relationships
    projects = relationship("Project", back_populates="owner")
    tasks = relationship("Task", back_populates="assignee")

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Basic Info
    name = Column(String(255), nullable=False)
    description = Column(Text)
    project_type = Column(Enum(ProjectType), nullable=False)
    
    # Project Data
    metadata = Column(JSONB)  # Flexible data for different project types
    color_scheme = Column(String(20))  # For Mind-Biome visualization
    
    # Status
    is_active = Column(Boolean, default=True)
    is_archived = Column(Boolean, default=False)
    
    # Timestamps  
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    owner = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    parent_task_id = Column(UUID(as_uuid=True), ForeignKey("tasks.id"))  # For recursive tasks
    
    # Task Info
    title = Column(String(500), nullable=False)
    description = Column(Text)
    status = Column(Enum(TaskStatus), default=TaskStatus.TODO)
    
    # Catalyst System Data
    is_catalyst_fragment = Column(Boolean, default=False)
    effort_points = Column(Integer, default=1)  # For gamification
    complexity_level = Column(Integer, default=1)  # 1-5 scale
    
    # Mind-Biome Data
    biome_object_type = Column(String(50))  # "crystal", "lichen", "stream"
    biome_position = Column(JSONB)  # x, y coordinates in biome
    
    # Scheduling
    due_date = Column(DateTime)
    estimated_duration = Column(Integer)  # minutes
    actual_duration = Column(Integer)  # minutes
    
    # Mood & Energy
    required_energy_level = Column(Integer)  # 1-5 scale
    required_mood = Column(String(50))  # "focused", "creative", "analytical"
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime)
    
    # Relationships
    project = relationship("Project", back_populates="tasks")
    assignee = relationship("User", back_populates="tasks")
    subtasks = relationship("Task", backref="parent_task", remote_side=[id])

class SkillNode(Base):
    __tablename__ = "skill_nodes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    parent_skill_id = Column(UUID(as_uuid=True), ForeignKey("skill_nodes.id"))
    
    # Skill Info
    name = Column(String(255), nullable=False)
    description = Column(Text)
    skill_type = Column(String(50))  # "technical", "creative", "business"
    
    # Progress Tracking
    level = Column(Integer, default=0)
    experience_points = Column(Integer, default=0)
    mastery_threshold = Column(Integer, default=100)
    
    # Visualization
    constellation_position = Column(JSONB)  # x, y, z coordinates
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    children = relationship("SkillNode", backref="parent_skill", remote_side=[id])

class Evidence(Base):
    __tablename__ = "evidence"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    skill_id = Column(UUID(as_uuid=True), ForeignKey("skill_nodes.id"), nullable=False)
    task_id = Column(UUID(as_uuid=True), ForeignKey("tasks.id"), nullable=False)
    
    # Evidence Data
    source_type = Column(String(50))  # "github", "file", "external"
    source_url = Column(String(1000))
    content_snippet = Column(Text)
    metadata = Column(JSONB)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
