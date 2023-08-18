# SdLinks - MERN Link Shortener WebApp
Live Link : https://sdlinks.vercel.app/

SdLinks is a powerful MERN (MongoDB, Express.js, React, Node.js) based link shortener web application that allows you to effortlessly generate shortened links and gain insights into their performance. With user-friendly frontend and backend technologies, SdLinks provides a seamless experience for both users and developers.

## Table of Contents

- [API Routes](#api-routes)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [User Dashboard](#user-dashboard)
- [Contributing](#contributing)
- [License](#license)

## API Routes

- `POST /` - Generate a shortened link by providing the `url` in the request body.
- `GET /:shortId` - Redirect to the original link associated with the given `shortId`.
- `POST /user/login` - User login. Provide `email` and `password` in the request body.
- `POST /user/signup` - User signup. Provide `email` and `password` in the request body.
- `GET /user/logout` - User logout.
- `GET /user/dashboard` - Access the user dashboard.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/yourusername/SdLinks.git`
2. Navigate to the project directory: `cd SdLinks`

### Backend Setup

3. Navigate to the backend directory: `cd backend`
4. Install dependencies: `npm install`
5. Create a `.env` file with the following environment variables:

```
PORT=3001
MONGODB_URL=<your MongoDB connection URL>
BACKEND_URL=http://localhost:3001
JWT_SECRET=<your JWT secret key>
CLIENT_URL=http://localhost:3000
Start the backend server: npm start

```

**Frontend Setup**
```
    Open a new terminal and navigate to the frontend directory: cd frontend
    Install dependencies: npm install
    Create a .env file with the following environment variable:
    REACT_APP_BACKEND_URL=http://localhost:3001
    Start the frontend development server: npm start
```

**Environment Variables**

    PORT: Port number for the backend server.
    MONGODB_URL: URL for connecting to the MongoDB database.
    BACKEND_URL: URL of the backend server.
    JWT_SECRET: Secret key for JSON Web Token (JWT) encryption.
    CLIENT_URL: URL of the frontend client.

**Usage**

    After setting up the backend and frontend, you can access the web application at http://localhost:3000.
    Shorten links without login or signup or log in to access the dashboard and track link performance.

**User Dashboard**

Upon logging in, users can access their personalized dashboard, which provides the following features:

    Link Analytics: Gain insights into how many views each of your shortened links has received.
    Link Management: Easily view and manage all of your generated short links.
    User Profile: Update your user profile information and manage account settings.
    Logout: Log out securely when you're done using the dashboard.

**Contributing**

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.
License

This project is licensed under the MIT License - see the LICENSE file for details.
