# ALBA Properties Demo

This project is a web-based application built using Node.js, Express, and MongoDB that allows users to manage properties by creating and editing property details.

## Table of Contents

-   [Introduction](#introduction)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/miranas11/ALBA.git
    ```

2. Change the ENV setting in config.js from "PROD" to "DEV"

    For frontend

    ```bash
    cd frontend/src/config.js
    ```

    For Backend

    ```bash
    cd backend/config.js
    ```

3. Install the dependencies and start servers:

    ```bash
    cd backend
    npm install
    node server.js
    ```

    ```bash
    cd frontend
    npm install
    npm start
    ```

##Usage
For Users:
Open your browser and go to http://localhost:3001/home
Use the click interest button to show your interest in a property

For Admins:
Open your browser and go to http://localhost:3001/admin.
Login or Register
Use the form to create a new property or edit an existing property.

## API Endpoints

| HTTP Verbs | Endpoints                             | Action                                   |
| ---------- | ------------------------------------- | ---------------------------------------- |
| POST       | /auth/register                        | To sign up a new admin account           |
| POST       | /auth/login                           | To login an existing admin account       |
| POST       | /auth/saveUser                        | To save a user account                   |
| POST       | /property/create                      | To create a new property                 |
| POST       | /property/addLead/:propertyId/:leadId | To add lead to a property                |
| PATCH      | /property/edit/:propertyId            | To edit the details of a single property |
| DELETE     | /peroperty/delete/:propertyId         | To delete a single property              |
| GET        | /property/getAll                      | To get all properties                    |
