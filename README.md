## Description

The service is created to serve the notifications from the user service through the message broker.
>   ❗⚠️  **Should be started after the user-service.**

## Set up the project 
Created env config file like below
```dotenv
NODE_ENV=dev
MAILJET_API_KEY=
MAILJET_SECRET_KEY=

RABBIT_MQ_USER=andee
RABBIT_MQ_PASSWORD=guest
RABBIT_MQ_HOST=rabbitmq
RABBIT_MQ_VHOST=notifications
```
## Running the project

To run the project just run the docker command. Note that this service should be run after the user service.

```bash
$ docker-compose up -d
```