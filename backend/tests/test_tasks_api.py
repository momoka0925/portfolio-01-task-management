from fastapi.testclient import TestClient


def test_create_task(client: TestClient) -> None:
    response = client.post("/tasks", json={"title": "牛乳を買う"})

    assert response.status_code == 201
    body = response.json()
    assert body["success"] is True
    assert body["data"]["title"] == "牛乳を買う"
    assert body["data"]["is_done"] is False


def test_list_tasks(client: TestClient) -> None:
    client.post("/tasks", json={"title": "タスク1"})
    client.post("/tasks", json={"title": "タスク2"})

    response = client.get("/tasks")

    assert response.status_code == 200
    body = response.json()
    assert len(body["data"]) == 2


def test_get_task_not_found(client: TestClient) -> None:
    response = client.get("/tasks/999")

    assert response.status_code == 404
    assert response.json()["success"] is False


def test_update_task(client: TestClient) -> None:
    created = client.post("/tasks", json={"title": "元タイトル"}).json()["data"]

    response = client.put(f"/tasks/{created['id']}", json={"title": "更新後", "is_done": True})

    assert response.status_code == 200
    body = response.json()
    assert body["data"]["title"] == "更新後"
    assert body["data"]["is_done"] is True


def test_delete_task(client: TestClient) -> None:
    created = client.post("/tasks", json={"title": "削除対象"}).json()["data"]

    response = client.delete(f"/tasks/{created['id']}")
    assert response.status_code == 200

    get_response = client.get(f"/tasks/{created['id']}")
    assert get_response.status_code == 404


def test_create_task_validation_error(client: TestClient) -> None:
    response = client.post("/tasks", json={"title": ""})

    assert response.status_code == 422
