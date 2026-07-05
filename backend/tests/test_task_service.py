import pytest
from sqlalchemy.orm import Session

from app.schemas.task import TaskCreate, TaskUpdate
from app.services.task_service import TaskNotFoundError, TaskService


def test_create_and_get_task(db_session: Session) -> None:
    service = TaskService(db_session)

    created = service.create_task(TaskCreate(title="レビュー対応"))
    fetched = service.get_task(created.id)

    assert fetched.title == "レビュー対応"
    assert fetched.is_done is False


def test_get_task_raises_when_missing(db_session: Session) -> None:
    service = TaskService(db_session)

    with pytest.raises(TaskNotFoundError):
        service.get_task(123)


def test_update_task(db_session: Session) -> None:
    service = TaskService(db_session)
    created = service.create_task(TaskCreate(title="旧タイトル"))

    updated = service.update_task(created.id, TaskUpdate(title="新タイトル", is_done=True))

    assert updated.title == "新タイトル"
    assert updated.is_done is True


def test_delete_task(db_session: Session) -> None:
    service = TaskService(db_session)
    created = service.create_task(TaskCreate(title="削除する"))

    service.delete_task(created.id)

    with pytest.raises(TaskNotFoundError):
        service.get_task(created.id)
