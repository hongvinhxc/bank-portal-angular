#!/bin/bash

# Build docker image
docker build -t bank-angular:1.0 .

# Compose container
docker-compose up -d

echo "";
echo "Go http://localhost:4200/ to see Bank-portal interface";
