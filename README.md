# `Meetup`

This clone aims to mimic both the look and functionality of meetup.com.

## [Live Link](https://khz538-meetup-clone.herokuapp.com/)

![](Screencast%20from%2008-01-2022%2007_20_53%20AM.gif)

## Technologies

#### Front-End
- React
- Redux
- CSS

#### Back-End

- Express.js
- Node.js
- Sequelize

## Instructions

1. Clone the repository
2. Run npm i in the root, backend, and frontend directories to install node dependencies
3. Create a .env in the backend directory following the example file
4. Run `npx dotenv sequelize db:migrate` and `npx dotenv sequelize db:seed:all` in the backend dir to initialise the db
5. Run `npm start` first in the backend, then the frontend directories. The app is available at localhost:3000.

## Challenges

On the backend server, correctly associating database tables was the most challenging.
For the frontend, styling was particulary difficult to grapple with at times due to use of px instead of relative measurements.

## Improvements

1. Tidy up the backend code and perhaps add some middleware to handle errors.
2. Change the names of some db columns and tables to better clarify what they are for.
3. Add more robust seeder data for functionality's sake.
