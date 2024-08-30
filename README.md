<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project Structure

The project follows a modular structure based on NestJS best practices:

- `src/`: Contains the main application code
  - `modules/`: Each module represents a feature of the application
    - `appointment/`: Handles appointment-related functionality
    - `slot/`: Manages slot-related operations
    - `config/`: Manages day-off and working hours related operations
  - `scriptss/`: Contains scripts for database data initiation
  - `dtos/`: Contains DTOs (Data Transfer Objects)
  - `config/`: Configuration files and environment variables
  - `database/`: Database-related files
  - `main.ts`: Entry point of the application


## Project setup


$ yarn install


## Database Configuration

Before running the project, make sure to set up your database credentials in the `.env.dev` file. Add the following environment variables:


DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name


Replace the placeholders with your actual database credentials.

## Running the app


# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

## API Usage

### Appointments

1. Get Available Slots
   - Method: GET
   - Endpoint: `/appointments/available-slots/:date`
   - Example: `GET /appointments/available-slots/2024-04-04`
   - Response:
     ```json
     [
       {
         "date": "2024-04-04",
         "time": "10:00",
         "available_slots": 1
       },
       {
         "date": "2024-04-04",
         "time": "10:30",
         "available_slots": 1
       }
     ]
     ```

2. Book an Appointment
   - Method: POST
   - Endpoint: `/appointments`
   - Body:
     ```json
     {
       "date": "2024-04-04",
       "time": "10:00"
     }
     ```
   - Response: Created appointment object

3. Cancel an Appointment
   - Method: DELETE
   - Endpoint: `/appointments/:id`
   - Example: `DELETE /appointments/1`
   - Response: 204 No Content

### Configuration

1. Set Day Off
   - Method: POST
   - Endpoint: `/config/days-off`
   - Body:
     ```json
     {
       "date": "2024-12-25",
       "description": "Christmas Day"
     }
     ```
   - Response: Created day off object

2. Set Unavailable Hours
   - Method: POST
   - Endpoint: `/config/unavailable-hours`
   - Body:
     ```json
     {
       "dayOfWeek": 1,
       "startTime": "12:00",
       "endTime": "13:00",
       "description": "Lunch Break"
     }
     ```
   - Response: Created unavailable hour object

3. Get Configuration
   - Method: GET
   - Endpoint: `/config`
   - Response: Current configuration including operational hours, slot duration, etc.

### Slots

1. Get All Slots for a Date
   - Method: GET
   - Endpoint: `/slots/:date`
   - Example: `GET /slots/2024-04-04`
   - Response: Array of slot objects for the given date

Note: Replace `:date` and `:id` with actual values when making requests. Ensure you're running the application and connected to the database before testing these endpoints.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
