# Video Progress Tracker - Backend

This is the **Backend API** for the Video Progress Tracker project.  
It handles storing and retrieving users' video watch progress.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS (Cross-Origin support)

## 🚀 Features

- Save video progress (watched intervals and percentage)
- Fetch saved progress for a user and video

## ⚙️ Project Structure
/models
└── Progress.js

/routes
└── update_route.js

server.js
##  Environment Variables
MONGODB_URI=mongodb://localhost:27017/video-progress
PORT=4000

## Running the Backend
nodemon server

The API will run on:
http://localhost:4000

## Developer
Sudharshan Malyavantam
