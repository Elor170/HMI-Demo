# HMI-Demo
### How to run
To use multiple docker compose files, use -f option and specify the compose file file: <br/> 
`docker compose -f ./path_to_compose_file up`
#### Run Dev
`docker compose -f ./docker-compose.dev.yml watch`
#### Run Prod
`docker compose -f ./docker-compose.prod.yml up`
