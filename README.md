# HMI-Demo
A demo for HMI architecture 

## Installation
### Dependencies
* [Docker](https://www.docker.com/)
* [Git](https://git-scm.com/) (Only for online installation)


## How To Run
### Before you begin
Rename the `.env.example` file to `.env` and change the data there according to your installation-environment.
zsIt's also important to make sure that your machine has a way to run docker-compose files.

### Dev Build
In root of the repo, run the following command: 

```shell
docker compose -f ./docker-compose.dev.yml up -d
```

This should start your entire dev environment. You can then access the frontend through the provided port you've wrote in the `.env` file.

### Production Build
#### If you're running offline
Make sure to install all of the docker images on your offline environment before proceeding.
You can install a docker image offline by using the following command:
```bash
sudo docker load -i <Image file name>.docker
```

#### Setup Frontend Server
In your frontend environment, run the following command:
```bash
docker compose -f ./docker-compose.prod.frontend.yml up -d
```
Now the frontend server should start automatically when the machine boots up.

#### Setup Backend Server
In your backend environment, run the following command:
```bash
docker compose -f ./docker-compose.prod.backend.yml up -d
```
Now the backend server should start automatically when the machine boots up.
