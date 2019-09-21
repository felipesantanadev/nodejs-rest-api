# Node JS Rest API with Express and Mongoose

This project implements the Node JS Express library for build REST APIs and the Mongoose library for MongoDB access.

Inside the `docker` folder you will find a `docker-compose.yaml` file built to run the MongoDB and the MongoDB Express (a web client for Mongo database).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

In order to run the project, you will need:

- Docker running on your machine
- Node JS installed in your machine
- [MongoDB](https://www.mongodb.com)

## Configuring the MongoDB

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

Before we can run the container, let's create a volume call mongodbdata:

```
docker volume create mongodbdata
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

Now, we're going to create a new database and set a user to make authentication.  
Before we can do it, let's connect to the MongoDB that is running in a docker container:  
`mongo mongodb://localhost:27017`  

To more details about how to use MongoDB commands, please, follow the oficial [documentation](https://docs.mongodb.com/manual/mongo/).

To create a new database use the `use DATABASE_NAME` command. So let's create a new database called `nodeapi`.    

`mongo use nodeapi`

The command above creates a new database called `nodeapi`. After creating the dabase, let's create a `nodeapi-root` role and a root user to the `nodeapi` database.

Command to create the role:  
```
db.createRole(
   {
     role: "nodeapi-root",
     privileges: [
       { resource: { db: "nodeapi", collection: "" }, actions: [ "find", "update", "insert", "remove" ] },
       { resource: { db: "nodeapi", collection: "usersCollection" }, actions: [ "update", "insert", "remove" ] },
       { resource: { db: "nodeapi", collection: "" }, actions: [ "find" ] }
     ],
     roles: []
   },
   { w: "majority" , wtimeout: 5000 }
)
```

Command to create the user:  
```
db.createUser({
                "user" : "nodeapi_user",
		"pwd": "nodeapi_password",
                "roles" : ["nodeapi-root"],
                "mechanisms" : [
                        "SCRAM-SHA-1",
                        "SCRAM-SHA-256"
                ]
})
```

After creating an user to the `nodeapi` database, configure the MongoDB connection string in the `.env` file which was uploaded to this repository.  

`MONGODB_CONNECTION = mongodb://nodeapi_user:nodeapi_password@localhost:27017/nodeapi`

## Starting the application

Run the `npm install` command in project's root folder to install the project's dependencies, so you will be able to start the application with the `npm start` command.  

The server will listen on the 3000 port.

## Testing the application

### Create a post
```
HTTP POST localhost:3000/posts
{
	"title": "The post title",
	"description": "The post description."
}
```

### Get all the posts
```
HTTP GET localhost:3000/posts
```

### Delete a specic post
```
HTTP DELETE localhost:3000/posts/POST_ID
```

### Update a specific post
```
HTTP PATCH localhost:3000/posts/POST_ID
{
	"title": "The NEW post title",
	"description": "The NEW post description."
}
```


## Built With

* [Node JS](https://nodejs.org/en/) - The runtime used
* [MongoDB](https://www.mongodb.com) - NoSQL Database
* [Docker](https://www.docker.com/) - The container platform
