# Javascript & Python compiler

# Made for educational purposes only

# How to use compiler

    Paste your code and click the 'Compile' button.

# Technology workflow

    1. Prebuild python and javascript images, docker-compose - rabbitMQ and PostgreSQL;
    2. On `POST` http request from client node.js sends code & specified language (javascript/python) to rabbitMQ queue
        and sends back unique `id` to client;
    3. Awaiting response from rabbitMQ queue, runs docker container to get the results of compiled
        code and inserts specified values to PostgreSQL;
    4. On `GET` http request , if rabbitMQ queue is not ready yet, notifies the client that results aren't ready,
        otherwise, get's compiled results from PostgreSQL and sends back to client.

# Technology stack

    - node.js (express.js)
    - docker/docker-compose
    - react.js
    - rabbitMQ
    - PostgreSQL
