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
* The dockerfile is not updated as well.
* Ihave choosed to implement a simple In memory cache, so it would be easier and fast to create this project
