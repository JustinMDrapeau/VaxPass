# VaxPass Server

## Starting Server

To start the Express server for development, run the following command in your terminal:

> npm run server

This will start the server using `nodemon` which will hot reload when changes are detected. Console outputs and error messages will be displayed in this terminal shell.

You will also need the `.env` file that stores the necessary API keys and environment variables. Check the FYDP discord for the latest environment file. Any calls to Alchemy and external services probably won't work without an environment file.

## API Structure

The `routes/api` directory stores the Express API calls. The goal is to have a file for each main service or functionality. Examples include profile, user, clinic, etc.

The high level endpoint structure is: `/api/{service}/{functionality}`, with any query parameters (such as user identifiers, etc.) attached to the end.


## Server TODOs
In terms of higher level server tasks, we will need to implement JWT tokens for authentication as well as a body parser to sanitize data coming in to the application.

- [PassportJS](https://www.npmjs.com/package/passport)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
