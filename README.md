# Notio - Backend

### This is the backend component of the Notio Kanban app, responsible for handling the API requests and database operations.

## Features

-   Create, read, update & delete Kanban boards, columns, & cards.
-   Authenticate users using JWT tokens & enforce access control to ensure users can only access their own data.
-   Interact with a PostgreSQL database to store & retrieve data.

## Tech Stack

-   Node.js
-   Express
-   Docker
-   PostgreSQL
-   Knex.js
-   Joi

## Installation

1. Clone the repository - `git clone https://github.com/dannyboi07/notio_api.git`
2. Install the dependencies

-   `cd notio_api`
-   `npm install`

3. Create a `.env` file in the root directory and add the following environment variables:

-   PORT
-   BASE_URI
-   DB_HOST
-   DB_NAME
-   DB_PORT
-   DB_USER
-   DB_PW
-   PW_SALT_RND
-   ACCESS_TOKEN_SECRET
-   REFRESH_TOKEN_SECRET

4. Database setup

-   You can either use Docker to run a PostgreSQL container or install PostgreSQL locally.
    If you choose to use Docker, simply run `docker-compose up -d` in the root directory to start the container. Everything else should be set up automatically.
-   Run the sql scripts in the `db` folder to create the database and tables.

5. Run the app

-   Production: `npm start`
-   Development: `npm run dev`

6. The app should now be running on `http://localhost:{PORT}`
