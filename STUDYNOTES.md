# Employee Database GUI Notes - Learnings

This is a project done to learn backend and frontend technologies and frameworks through the MERN stack (MongoDB, Express.js, Node.js, React + Bootstrap). 

Tutorial to create similar web app can be found here: https://www.mongodb.com/languages/mern-stack-tutorial

**Server Dependencies**
* mongodb: drivers to allow NodeJS app to connect to db
* express: web framework for NodeJS
* cors: NodeJS package that allows for cross origin resource sharing (HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources)
* dotenv: module that loads environment variables from .env file to process.env file --> separate config files from code

*Server notes*
* server.js is the main body that calls the other files/dependencies
* routes (record.js) allow the db to be read/modified by the server
    * the specified route is an application endpoint (uri) that responds to requests in a specified way. https://expressjs.com/en/guide/routing.html
    * when fetching from a specified url ending a specific function is done
* conn.js establishes a connection to the mongodb database
    * ran into error where couldn't connect to database, and had to change the MongoDB network access to public. 

**Client Dependencies**
* bootstrap: preset templates/components for web apps
* react-router-dom: React router components for web apps -> allows for changes in views without refreshing the whole page

*Client notes*
* async functions
* cannot change state of unmounted components
* fetch (returns promise that must be resolved to a Response object of the HTTP response then to json via .json())
    * additional request options through init object arg with method, headers, body
* useParams and useNavigate from react router dom
* routes to switch between components to view
* learnt some bootstrap functionalities

**Publishing App to Web**
* Used Microsoft Azure App Services
* https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=windows&pivots=development-environment-vscode 
    * needed to add new app setting for web config
* Linked GitHub Repo for CI/CD
* moved server files to root and followed this (changed package.json and server.js): 
    * https://stackoverflow.com/questions/56983971/a-way-to-deploy-a-mern-app-to-azure-instead-of-heroku#:~:text=1%20Answer&text=In%20order%20to%20make%20a,static%20react%20build%20through%20express.&text=Note%3A%20Edit%20this%20to%20meet,in%20your%20Azure%20application%20settings. 
    * https://create-react-app.dev/docs/deployment/
* Had to ensure build folder for react client in git repo
* Cannot hardcode PORT in web app as Azure assigns their own - used /api as a base url for server routing/fetching in client
    * https://stackoverflow.com/questions/43763680/cannot-post-api-register-in-node-js 