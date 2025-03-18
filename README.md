# Blog Management Application
 
This document provides instructions for setting up and running the Blog Management Application, along with essential information about the project.
 
## Table of Contents
    Frontend: React, React Router, Jotai, TailwindCSS.
    Backend: Express, Zod, uuid, json2md, archiver, Node filesystem
 
## Project Description
 
The Blog Management Application is a web-based platform that allows users to create, read, update, and delete blog posts. It provides a user-friendly interface for managing blog content, including features like tagging, bookmarking, and searching.
 
## Features
 
* Create, read, update, and delete blog posts.
* Tagging of posts for categorization and search.
* Bookmarking posts for saving favorite articles.
* Searching posts by title or content.
* User-friendly interface with Tailwind CSS styling. 
* Responsive design for various screen sizes.
 
## Technologies Used
 
* Frontend: React, Tailwind CSS 
* Backend: Node.js, Express
* Database: ()
 
 
## Installation
 
1.  **Clone the repository:**
 
    git clone 
 
2.  **Navigate to the project directory:**
 
    
 
## Running the Application
 
### Backend
 
1.  **Navigate to the backend directory:**
 
    cd backend
    
 
2.  **Install dependencies:**
 
    npm install
   
 
3.  **Set up environment variables:**
 
4.  **Start the backend server:**
 
    npm run dev
 
    The backend server will start at (e.g., `http://localhost:5000`).
 
### Frontend
 
1.  **Navigate to the frontend directory:**
     cd frontend
    
 
2.  **Install dependencies:**
     npm install
 
3.  **Set up environment variables:**
  
4.  **Start the frontend development server:**
 
    npm start
    
 
    The frontend application will be accessible at (e.g., `http://localhost:3000`).
 
## Environment Variables

 
## Database Configuration
we used json file for the moment
//TODO: link MongoDB database 
 
## API Endpoints
  
* `GET /api/posts`: Retrieves all posts.
* `GET /api/posts/:id`: Retrieves a single post by ID.
* `POST /api/posts`: Creates a new post.
* `PUT /api/posts/:id`: Updates an existing post.
* `DELETE /api/posts/:id`: Deletes a post.
