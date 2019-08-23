# Project Title

This project implements the Node JS Express library for build REST APIs and the Mongoose library for MongoDB access.

Inside the `docker` folder you will find a `docker-compose.yaml` file built to run the MongoDB and the MongoDB Express (a web client for Mondo database).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

In order to run the project, you will need:

- Docker running on your machine
- Node JS installed in your machine

### Installing

Before running the project you will need to create the MongoDB environment with docker containers.
To change the MongoDB and MongoDB Express users and password, open the `docker-compose.yaml` inside the `docker` folder and change the following environment variables:

#### Changing the MongoDB username and password

```
MONGO_INITDB_ROOT_USERNAME: mongouser
MONGO_INITDB_ROOT_PASSWORD: mongopassword
```

#### Changing the Mongo Express username and password

```
ME_CONFIG_BASICAUTH_USERNAME: admin
ME_CONFIG_BASICAUTH_PASSWORD: 123456
```

You also need to set up the MongoDB username and password for the Mongo Express service in the docker-compose file:

```
ME_CONFIG_MONGODB_ADMINUSERNAME: mongouser
ME_CONFIG_MONGODB_ADMINPASSWORD: mongopassword
```

After configuring the docker-compose file, let's run the containers!

```
docker-compose up -d
```

And let's check if the containers are running with `docker container ls`. The terminal will display the containers like:

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS
     NAMES
a41c2b78cc1c        mongo-express       "tini -- /docker-ent…"   3 minutes ago       Up 12 seconds       0.0.0.0:8081->8081/tcp     docker_mongo-express_1
463c6091a9de        mongo               "docker-entrypoint.s…"   3 minutes ago       Up 13 seconds       0.0.0.0:27017->27017/tcp   mongo
```

Now you can access `localhost:8081` and use the MongoDB Express username and passoword to manage databases.

## Running the tests

Coming soon...


## Built With

* [Node JS](https://nodejs.org/en/) - The runtime used
* [MongoDB](https://www.mongodb.com) - NoSQL Database
* [Docker](https://www.docker.com/) - The container platform
