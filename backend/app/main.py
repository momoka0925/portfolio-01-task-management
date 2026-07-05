import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.tasks import router as tasks_router
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine
from app.schemas.response import ApiResponse
from app.services.task_service import TaskNotFoundError

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Task Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(tasks_router)


@app.exception_handler(TaskNotFoundError)
def task_not_found_handler(request: Request, exc: TaskNotFoundError) -> JSONResponse:
    return JSONResponse(
        status_code=404,
        content=ApiResponse(success=False, message=f"Task {exc.task_id} not found").model_dump(),
    )


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
