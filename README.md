This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project includes
- Auth0 user authentication
- MaterialUI
- Redux & Slice

## Code patterns
- Slice & API calls
- User context and hooks
- Component archeitecture
- Global error handling
- Env vars for local (`.env`), testing (`.env.testing`), staging (`.env.staging`), production (`.env.production`)

## setup
1. create local `.env` file.
```
cp .env.example .env
```
2. Update env vars in `.env`.
-  You will need to setup an Auth0 account and application

3. Install dependencies:
```
npm i
```
4. Run application:
```
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/marionebl/create-react-app@9f6282671c54f0874afd37a72f6689727b562498/screencast-error.svg' width='600' alt='Build errors'>
</p>

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build:<environment | production or staging>`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## User Guide

You can find detailed instructions on using Create React App and many tips in [its documentation](https://facebook.github.io/create-react-app/).