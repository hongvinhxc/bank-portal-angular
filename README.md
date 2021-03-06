# BankPortalAngular

## Prerequisites

Install following dependencies beforehand.

1. Docker, docker-compose:
[Docker home page](https://docs.docker.com/get-docker/)
2. Git

## Build and start docker containers

Run this command to build base image and start container

```bash
./build-and-start.sh
```

Run this command to build image, you need to re-build image if package.json change

```bash
docker build -t bank-angular:1.0 .
```

Run this command to start project without rebuild bank-angular image

```bash
docker-compose up -d
```

## Stop docker-compose containers

Run this command to stop project

```bash
docker-compose stop
```

## Remove docker-compose containers

Run this command to stops containers and removes containers, networks, volumes, and images created by up

```bash
docker-compose down
```

After container was started, go http://localhost:4200/ to see Bank-portal interface
