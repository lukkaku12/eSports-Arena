
# E-sports Arena API Startup Guide

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (At least version 20.2 or later)
- **npm** (Node Package Manager, comes with Node.js)
- **PostgreSQL** (running on the specified port, usually 5432)

## Setup Instructions

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/lukkaku12/eSports-Arena.git
cd eSports-Arena
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add the following configuration:

```plaintext
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
```

Replace the placeholders with your actual PostgreSQL credentials.

### 4. Start the Development Server

You can now start the server in development mode with the following command:

```bash
npm run start:dev
```

This will start the application and make it available at `http://localhost:3000/api/v1`.

### 5. Access API Documentation

Once the server is running, you can access the API documentation via Swagger by navigating to:

```
http://localhost:3000/docs
```

## Important Commands

- **Run the development server**: `npm run start:dev`

## Deployment

 In case you wanna interact with the API, we hereby leave the link to such (deployed through DigitalOcean)

- http://159.223.175.64:3000/docs

## Troubleshooting

- If you encounter a `ConnectionNotFoundError`, double-check your database connection settings in the `.env` file and ensure that your PostgreSQL server is running.
- Ensure that the necessary tables and entities are created in your database.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## Planning / UML

link to UML

https://lucid.app/lucidchart/4367ae5b-ce67-4a28-a522-303927323c90/edit?viewport_loc=180%2C-341%2C2815%2C1429%2C0_0&invitationId=inv_b5e7d8fe-915a-4f76-bea2-b3f1bb493fc1

