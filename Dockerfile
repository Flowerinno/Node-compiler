# syntax=docker/dockerfile:1

FROM python:latest

WORKDIR /usr/app/src

COPY index.py ./

CMD ["python", "./index.py"]
