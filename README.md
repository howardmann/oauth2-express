#!/usr/bin/env bash

#  build the image and run the container
docker build -t oauth-express .
docker container run --name oauth-express --rm -p 3000:3000 oauth-express:latest

# Stop docker container
docker stop oauth-express

# List all running docker instances
docker ps

# ssh into docker container
docker exec -it oauth-express /bin/bash