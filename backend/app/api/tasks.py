from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.response import ApiResponse
from app.schemas.task import TaskCreate, TaskRead, TaskUpdate
from app.services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=ApiResponse[list[TaskRead]])
def list_tasks(db: Session = Depends(get_db)) -> ApiResponse[list[TaskRead]]:
    tasks = TaskService(db).list_tasks()
    return ApiResponse(success=True, data=[TaskRead.model_validate(t) for t in tasks])


@router.get("/{task_id}", response_model=ApiResponse[TaskRead])
def get_task(task_id: int, db: Session = Depends(get_db)) -> ApiResponse[TaskRead]:
    task = TaskService(db).get_task(task_id)
    return ApiResponse(success=True, data=TaskRead.model_validate(task))


@router.post("", response_model=ApiResponse[TaskRead], status_code=201)
def create_task(data: TaskCreate, db: Session = Depends(get_db)) -> ApiResponse[TaskRead]:
    task = TaskService(db).create_task(data)
    return ApiResponse(success=True, data=TaskRead.model_validate(task))


@router.put("/{task_id}", response_model=ApiResponse[TaskRead])
def update_task(task_id: int, data: TaskUpdate, db: Session = Depends(get_db)) -> ApiResponse[TaskRead]:
    task = TaskService(db).update_task(task_id, data)
    return ApiResponse(success=True, data=TaskRead.model_validate(task))


@router.delete("/{task_id}", response_model=ApiResponse[None])
def delete_task(task_id: int, db: Session = Depends(get_db)) -> ApiResponse[None]:
    TaskService(db).delete_task(task_id)
    return ApiResponse(success=True, data=None, message="Task deleted")
