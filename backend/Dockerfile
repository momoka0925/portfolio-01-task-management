FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

# デプロイ先(Railway等)が割り当てる $PORT を優先し、無ければ8000で起動する。
# 環境変数を展開するためシェル形式で実行する
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
