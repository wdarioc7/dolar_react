This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install dependencies

To install dependencies you can use Yarn or NPM in your shell:

`yarn install` or `npm install`, use only one package manager, I recommend Yarn.

## Available Scripts

In the project directory, you can run:

### `npm start`

To run the application first make a copy of the file .env_example and name it .env

**Do not** delete the .env_example file neither rename it.

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## File organization

#### Folder /config/

Config contains all webpack configuration to build and run the project, do not touch this unless you know
what do you want to do.

#### Folder /public/

Contains all public file to be included in the build, here we can found the base index.html file that will bootup the main react component, also you have some global css like nifty theme and some fonts, if you need
to change some meta you can do it at index.html here, but do not change the body of the html file because react
will inject all dependencies here.

#### Folder /scripts/

Contains all scripts to work with react, the start script that will boot up a development server and also the
build command, please do not change anything from this folder.

#### Folder /src/

This is the main source folder, all components and containers are here.

#### Folder /src/assets/

This folder contain all the assets that will be injected in the main javascript file, also images, there are converted to Base64 to be loaded easily on the system and avoid some request to server.

#### Folder /src/components/

Componets are the base classes on react, like buttons and UI object and in some way also we have some bigger components like charts, they are like "parts" of a puzzle that we connect in the containers. Components always
are together with it´s CSS classes.

#### Folder /src/containers/

Containers are a bigger component, they give the layout to the components and also bring logic to request and send information (in most of the cases) to the components. Container may be together with CSS classes that helps to create layout and also some UI aspects.

#### Folder /src/store

Contains all the redux logic for login (action and reducers), please check redux logic to understand these files.

#### Folder /src/utils/

Contains utilities to draw finantial chart (cup and handle charts) with chart.js, pleade do not touch this unless you have understanding the core library of chart.js.

#### File /src/axiosInstance

Contains all the instances of axios used for create request to backend.

#### Other files in /src/

Other files are created by react, but some modification in index.js is the entry file to bundle the main.js in production build, Also create instances of Reducers for redux and Browser route for react-router. The App.js file contain the bootstraped component used as principal components, we define routes here.

#### /theme/

Contains a ZIP file with the Nifty bootstrap theme for documentation and further works.


#### .env_example and .env file
An .env file contains all secrets and configuration for running the file, there is a .env_example file with all the variables used in the project you duplicate .env_example and rename the copy as ".env" without quotes in the same folder and fill all the information.

REACT_APP_BASEPATH=/ <= Base route for react-route
REACT_APP_PROXY_SERVER=https://proxy.set-icap.com <= Proxy server to avoid CORS in some request for older back
REACT_APP_NODE_SERVER=https://back.set-icap.com/ <= New backend with node
NODE_ENV=production <= Always production if you are building for production environment
REACT_APP_TRIMESTRAL_PRICE="483.557" <= Price for 3 month of the service
REACT_APP_SEMESTRAL_PRICE="899.640" <= Price for 6 month of the service
REACT_APP_ANUAL_PRICE="1'664.334" <= Price for a year of service



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
