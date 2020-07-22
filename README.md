# React Notes App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This app is made with MongoDB, Express, React, and Node.js, more specifically typescript

To visit the app go to https://notes.satvikreddy.com

## Cloud Services / CDNs Used for this project

- [MongoDB Cloud Atlas](https://www.mongodb.com/) to host a MongoDB cluster
- [AWS EC2](https://aws.amazon.com/ec2/) to host the express server
- [Netlify](https://www.netlify.com/) to serve static files (frontend)

To run the app locally follow these instructions:

create a `.env` file in the `backend/` folder and create a variable called `ATLAS_URI` and put in your mongodb connection string.

Then run these commands:

```shell
# Install backend dependencies
cd backend
yarn install
cd ..

# Install frontend dependencies
cd frontend
yarn install
cd ..

# Run the app locally
yarn install
yarn run dev
```
