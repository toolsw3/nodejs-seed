# NodeJS Workshop

## Dependencies

Docker and docker-compose

## Setup development environment

### Prepare the project

Create the .env file

`cp .env.dist .env`

Build docker containers

`docker-compose build`

`docker-compose up -d` builds, (re)creates, starts, and attaches to containers for a service.

### How to run

`docker-compose start` to start all the containers

`docker-compose stop` to stop all the containers

`docker-compose down` destroys the containers, data generated for this containers will be gone (fe: database data)

`docker-compose restart` to restart all the containers

`docker-compose logs -f app` shows nodejs console output

`docker-compose exec app yarn {options}` to use yarn

The dev environment will run in http://localhost:3000/

### ESLint and Prettier

To see linting issues `docker-compose exec app yarn run lint`

To automatically fix linting issues (when possible) `docker-compose exec app yarn run lint-and-fix`

To see style issues `docker-compose exec app yarn prettier-check`

To fix style issues `docker-compose exec app yarn prettier-format`

### Visual studio code

[Download](https://code.visualstudio.com/download)

[Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Recommended configuration in vscode's `settings.json` file

```jsx
{
  // add to the default configuration

  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "editor.formatOnSave": true,
  "[javascript]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
}
```
