# NEXUS - Real-Time Social Chat Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) social chat application with real-time messaging, video calls, and user management features.

## 🚀 Live Demo

**Deployed on Render:** https://nexus-u1zk.onrender.com

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login** with JWT authentication
- **Profile Management** with customizable avatars
- **Multi-tab Authentication** - Login with different accounts in different tabs
- **Secure Password Hashing** with bcrypt

### 💬 Real-Time Communication
- **Instant Messaging** powered by Stream Chat API
- **Video Calls** with Stream Video integration
- **Real-time Notifications** for new messages
- **Online/Offline Status** tracking

### 👥 Social Features
- **Friend System** - Send and accept friend requests
- **User Discovery** - Find and connect with new people
- **Profile Customization** - Edit profile information and pictures
- **College/Field Filtering** - Connect with people from your institution

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop and mobile
- **Dark/Light Theme** support with DaisyUI
- **Modern Interface** with Tailwind CSS
- **Intuitive Navigation** with sidebar and navbar

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Stream Chat API** - Real-time messaging
- **Stream Video API** - Video calling

### Deployment
- **Render** - Cloud platform for hosting
- **MongoDB Atlas** - Cloud database
- **GitHub** - Version control

## 📁 Project Structure

```
NEXUS/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── lib/             # Utility functions
│   │   └── server.js        # Server entry point
│   ├── package.json
│   └── .env                 # Environment variables
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── store/           # State management
│   │   ├── constants/       # App constants
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # App entry point
│   ├── public/              # Static assets
│   ├── package.json
│   └── .env                 # Environment variables
├── package.json             # Root package.json
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Stream Chat account (for messaging features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vatspratapsingh/Nexus.git
   cd Nexus
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Environment Setup**

   **Backend (.env)**
   ```env
   NODE_ENV=development
   PORT=5001
   MONGO_URL=mongodb://localhost:27017/nexus
   JWT_SECRET_KEY=your-jwt-secret-key
   STREAM_API_KEY=your-stream-api-key
   STREAM_API_SECRET=your-stream-api-secret
   ```

   **Frontend (.env)**
   ```env
   VITE_STREAM_API_KEY=your-stream-api-key
   ```

4. **Start the development servers**
   ```bash
   # Start backend (from root directory)
   npm run dev:backend
   
   # Start frontend (from root directory)
   npm run dev:frontend
   
   # Or start both together
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 📱 Features Walkthrough

### 1. Authentication
- **Sign Up**: Create account with email, password, and profile info
- **Login**: Secure authentication with JWT tokens
- **Multi-tab Support**: Login with different accounts in different tabs

### 2. User Discovery
- **Discover Page**: Find new people to connect with
- **Friend Requests**: Send and accept friend requests
- **Profile Viewing**: See user profiles and information

### 3. Messaging
- **Real-time Chat**: Instant messaging with friends
- **Message History**: View conversation history
- **Online Status**: See when friends are online

### 4. Video Calls
- **One-click Calls**: Start video calls with friends
- **New Tab Opening**: Calls open in separate tabs
- **Stream Integration**: Powered by Stream Video API

### 5. Profile Management
- **Edit Profile**: Update personal information
- **Avatar Management**: Upload custom images or generate random avatars
- **Settings Page**: Centralized profile management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get recommended users
- `GET /api/users/friends` - Get user's friends
- `GET /api/users/recent-conversations` - Get recent chat conversations
- `POST /api/users/friend-request/:id` - Send friend request
- `PUT /api/users/friend-request/:id/accept` - Accept friend request
- `GET /api/users/friend-requests` - Get incoming friend requests
- `GET /api/users/outgoing-friend-requests` - Get outgoing friend requests

### Chat
- `GET /api/chat/token` - Get Stream Chat token

## 🚀 Deployment

### Render Deployment
1. **Connect GitHub repository** to Render
2. **Create Web Service** with Node.js environment
3. **Set environment variables** in Render dashboard
4. **Configure build commands**:
   - Build: `cd frontend && npm install --production=false && npx vite build && cd ../backend && npm install`
   - Start: `cd backend && npm start`

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=10000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/nexus
JWT_SECRET_KEY=your-production-jwt-secret
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-api-secret
VITE_STREAM_API_KEY=your-stream-api-key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **Stream Chat** for real-time messaging infrastructure
- **Stream Video** for video calling capabilities
- **DaisyUI** for beautiful UI components
- **Tailwind CSS** for utility-first styling
- **Render** for hosting and deployment

---

**Built with ❤️ by Vats Pratap Singh**
