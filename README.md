---
Languages:
- JavaScript
- Node.js
- HTML/CSS
Frameworks:
- React
- Bootstrap
- Express.js
Technologies:
- MongoDB
- Azure App Service
---

# Employee Database Web App

This was a project done to learn fullstack web application development based on the MERN 3-tier architecture (MongoDB, Express.js, Node.js, React + Bootstrap), utilising Azure App Services to deploy it online. It was inspired by this [guide](https://www.mongodb.com/languages/mern-stack-tutorial). The web app involves: 

* A React/Bootstrap frontend and client to enable user requests (Create, Read, Update and Delete).
* An Express.js/Node.js server to handle and route these requests to a MongoDB Atlas database through APIs.
* A public website from which users can test out the web application without needing code. 

📢 View the final website [here](http://employeedatabasegui.azurewebsites.net/)!

***

## <a name="get-started"></a> Get Started

1. Clone this repository

```bash
git clone https://github.com/leonardo-fan/employee-database-webapp.git
```

2. Change into the directory where the repo was cloned and run `npm install` in both the root and client folder.

```bash
cd npm install
cd client
npm install
```

3. Configure the MongoDB connection settings

Go back to the root folder and open `/db/conn.js`. Change the `uri` and `databaseName` variables to match your MongoDB connection string and database name respectively. 

```javascript
const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI; // can replace with your own connection string or add an application setting to the Azure App Service
const databaseName = "YourDatabaseName" // replace with the required database name
```

Note that process.env.ATLAS_URI can either refer to:
- the Azure App Service Application Settings where you can add your own environment variables like the uri connection string for privacy. 
- or a local config.env file (that is in .gitignore) where you have added your connection string, like below:

```
ATLAS_URI=<your-connection-string>
```

If you are using a local config.env file, you will also need to navigate to `/server.js` and uncomment this line:

```javascript
require("dotenv").config({ path: "./config.env" });
```

Open `/routes/record.js` and change the `collectionName` variable to match your database collection name.

```javascript
const express = require("express");
const recordRoutes = express.Router(); // router used to define routes, middleware to control requests starting with path/record
const dbo = require("../db/conn"); // connect to db
const ObjectId = require("mongodb").ObjectId; // helps convert id from string to ObjectId for the _id mongodb queries
const collectionName = "records";
```

***

## Running The App Locally

When developing/testing locally, the app runs via two separate processes that need to be run parallel.

### 1. Start the Express Server

Ensure you have a local config.env file with the ATLAS_URI (refer to [Get Started](#get-started) Step 3). 
Navigate to the root directory and run:

```bash
node server.js
```

### 2. Start the React App

1. Change the base url for the fetch API

Navigate to `/client/src/App.js` and change the `baseURL` variable as shown below. Originally it is `/api` as this is what is used in the Azure App Service request urls.

```javascript
const baseURL = "http://localhost:5000";
```

2. Run the app

In another terminal window (as the server is running from one), navigate back up to the client folder, then run `npm start`. 

```bash
cd ..
npm start
```

***

## Deploying the App to Azure App Service to run on a website

Before deploying changes to production, the React app needs to be built. From there you can use the Azure App Service to deploy your app to the web.

Please note that you should also allow public network access to the specified MongoDB database so that it can be access through the website.

### 1. Build React App

Navigate to `/client` then run `npm run build`. This should be done every time a production ready change is done to the react app.

```bash
cd client
npm run build
```

### 2. Deploy to Azure App Service

#### Using the Azure App Service Visual Studio Code Extension

Follow the guide [here](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=windows&pivots=development-environment-vscode). You can skip the "Create your Node.js application" section.

#### Using the Azure App Portal

Follow the Microsoft Learning Module [here](https://docs.microsoft.com/en-au/learn/modules/host-a-web-app-with-azure-app-service/). You can skip the units where you create a test application if you would like.

#### Continuous deployment

Azure App Service also supports continuous deployment where a GitHub/other repository can be linked to an app. Everytime the repo changes, App Service will also rebuild the website. A guide for more information on this can be found [here](https://docs.microsoft.com/en-us/azure/app-service/deploy-continuous-deployment?tabs=github). 
