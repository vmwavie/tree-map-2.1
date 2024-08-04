# tree-map

A Vue.js application that generates interactive treemap graphics using data from various sources.

## Project setup

To set up the project, follow these steps:

1. Clone the repository:

```bash
  git clone https://github.com/vmwavie/tree-map.git
```

2. Navigate to the project directory:

```bash
cd tree-map
```

3. Install the dependencies:

```bash
npm install --force
```

4. Setup your API_KEY on /src/api/brapi/index.ts

- Get on https://brapi.dev/dashboard

## Project structure

- `public`: Contains static assets such as the `index.html` file and the `favicon.ico` image.
- `src`: The main source code directory, containing the Vue components, views, and various utility files.
- `tests`: Directory for unit tests.

## Available scripts

To run various tasks, use the following npm scripts:

- `npm run serve`: Starts the development server for your Vue.js application.
- `npm run build`: Compiles your Vue.js application for production.
- `npm run test:unit`: Runs unit tests for your Vue.js application.
- `npm run lint`: Runs ESLint to check your code for potential errors and stylistic issues.
- `docker compose up`: Builds and runs the application using Docker Compose. The application will be accessible at `http://localhost:8080`.
  I hope this improved documentation helps you understand and contribute to the project!
