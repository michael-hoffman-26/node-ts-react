# Fullstack main repo server
Items list fullstack repo

## Local Installation

First, you need to have `nvm` installed.

you will need 2 terminals one for the frontend and one for the server.

### Build frontend
```bash
cd frontend
nvm use
npm ci
npm run build
```

### Build the backend server
Build the server, using a new terminal at the main folder

```bash
nvm use
npm ci
npm run start:dev
```

## Attention some extra notes
* Not all packages are used right now, there are some packges that we can delete
* Ihave choosed to implement a simple In memory cache, so it would be easier and fast to create this project
* I need to refacto and use consits names for tasks, some times i have used items instead of tasks
* todo add jest testing for FE and BE
* todo update the css


## build image

docker build -t fullstack-task:v1.0 .

and uppload it into GC registry
us-east1-docker.pkg.dev/potent-trail-329612/basic-repo
docker tag YOUR_IMAGE_NAME REGION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/IMAGE_NAME

 gcloud auth configure-docker us-east1-docker.pkg.dev      
 

docker tag fullstack-task:v0.0.1 us-east1-docker.pkg.dev/potent-trail-329612/basic-repo/fulstack-task:v0.0.1
docker push 

docker build -t registry.example.com/my-repo/my-app:latest .
