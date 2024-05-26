

## Installation

```bash
$ npm install
```

## Running the app

```bash

# Start the database container
$ docker-compose up -d db

# Build the Docker images
$ docker-compose build

# Start the application
$ docker-compose up

```

## Routes

# Create Form
POST /form

# Fill Data

POST /fill_data?form_title=""

# Get Form by Title

GET /fill_data?form_title=new

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
