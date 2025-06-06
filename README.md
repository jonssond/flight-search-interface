# Flight Search Interface

A React-based flight search application that allows users to search, filter, sort, and favorite flights. This frontend interface connects to a Node.js backend API to provide real-time flight data.

## Features

- **Flight Search**: Search flights by origin, destination, and dates
- **Advanced Filtering**: Filter flights by multiple criteria
- **Sorting**: Sort flights by various columns (flight number, airline, price, etc.)
- **Favorites**: Mark flights as favorites and view them separately
- **Pagination**: Navigate through large flight datasets

## Prerequisites

Before running this project, you need to have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Backend Setup (Required)

**⚠️ Important**: This frontend application requires the backend API to be running first.

1. **Clone the backend repository**:
   ```bash
   git clone https://github.com/jonssond/flight-search.git
   ```

2. **Follow the backend setup instructions** in the cloned repository to install dependencies and start the API server.

3. **Ensure the backend is running** before starting the frontend application.

## Frontend Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/jonssond/flight-search-interface.git
   cd flight-search-interface
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Available Scripts

### `npm start`
```bash
npm start
```
Runs the app in development mode on [http://localhost:3001](http://localhost:3001).

The page will reload automatically when you make edits, and you'll see any lint errors in the console.

### `npm test`
```bash
npm test
```
Launches the test runner in interactive watch mode.

### `npm run build`
```bash
npm run build
```
Builds the app for production to the `build` folder. The build is optimized and minified for the best performance.

### `npm run lint`
```bash
npm run lint
```
Runs ESLint to check for code quality issues and potential errors.

### `npm run lint:fix`
```bash
npm run lint:fix
```
Runs ESLint and automatically fixes issues that can be resolved automatically.

### `npm run format`
```bash
npm run format
```
Formats code using Prettier according to the project's style configuration.

## Getting Started

1. **Start the backend API** (from the cloned flight-search repository)
2. **Start the frontend application**:
   ```bash
   npm start
   ```
3. **Open your browser** and navigate to [http://localhost:3001](http://localhost:3001)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── filter-form/    # Flight search form
│   ├── header/         # Application header
│   ├── table/          # Flight results table
│   └── ...
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── pages/              # Main page components
├── services/           # API service configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

