# Use the official Python image.
# https://hub.docker.com/_/python
FROM python:3.10

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR /app

RUN pip install 'poetry==1.3.2'
COPY . .
COPY .env .env

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes
RUN python -m pip install --upgrade pip

RUN pip install -r requirements.txt

EXPOSE 8000
CMD exec uvicorn main:app --host 0.0.0.0 --port 8000
