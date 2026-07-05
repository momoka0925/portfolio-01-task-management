from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


class TaskRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_all(self) -> list[Task]:
        return list(self.db.query(Task).order_by(Task.id).all())

    def get_by_id(self, task_id: int) -> Task | None:
        return self.db.get(Task, task_id)

    def create(self, data: TaskCreate) -> Task:
        task = Task(title=data.title, description=data.description, is_done=data.is_done)
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def update(self, task: Task, data: TaskUpdate) -> Task:
        task.title = data.title
        task.description = data.description
        task.is_done = data.is_done
        self.db.commit()
        self.db.refresh(task)
        return task

    def delete(self, task: Task) -> None:
        self.db.delete(task)
        self.db.commit()
