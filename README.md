node-red-contrib-todomvc-api
================

Node-RED node for todomvc-api

A simple TodoMVC API

## Install

To install the stable version use the `Menu - Manage palette - Install` 
option and search for node-red-contrib-todomvc-api, or run the following 
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-todomvc-api

## Usage

### Methods

#### GET /todos/

List all tasks

    X-Fields : string
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /todos/

Create a new task

    payload : 
    X-Fields : string
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### PUT /todos/{id}

Update a task given its identifier

    payload : 
    X-Fields : string
    id : integer
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /todos/{id}

Fetch a given resource

    X-Fields : string
    id : integer
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /todos/{id}

Delete a task given its identifier

    id : integer
     
    Accept : 'application/json'
    Content-Type : 'application/json'


## License

#### Apache-2.0

