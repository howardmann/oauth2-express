#!/usr/bin/env bash

#  build the image and run the container. Replace [__dirname] with your localhost parent directory
docker build -t docker-express .
docker container run --name docker-express --rm -p 3000:3000 -v ~/Users/howardmann/docker_aws_node/src:/usr/src/app/src  docker-express:latest

# Stop docker container
docker stop docker-express

# List all running docker instances
docker ps

# ssh into docker container
docker exec -it docker-express /bin/bash