# Social Network API

A RESTful API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. Built with MongoDB for handling large amounts of unstructured data.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Features

- Create, read, update, and delete users
- Add and remove friends from a user's friend list
- Create, read, update, and delete thoughts (posts)
- Create and delete reactions to thoughts
- Uses MongoDB for flexible data storage

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_uri
   ```
4. Start the server:
   ```bash
   npm start
   ```

For development with auto-reload:

```bash
npm run dev
```

## API Routes

### Users

- GET /api/users - Get all users
- GET /api/users/:id - Get single user
- POST /api/users - Create user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user
- POST /api/users/:userId/friends/:friendId - Add friend
- DELETE /api/users/:userId/friends/:friendId - Remove friend

### Thoughts

- GET /api/thoughts - Get all thoughts
- GET /api/thoughts/:id - Get single thought
- POST /api/thoughts - Create thought
- PUT /api/thoughts/:id - Update thought
- DELETE /api/thoughts/:id - Delete thought
- POST /api/thoughts/:thoughtId/reactions - Add reaction
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove reaction
