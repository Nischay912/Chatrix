# 🔗 Chatrix - Real-Time Chat Application

A modern, real-time chat application built with React and Node.js that provides seamless messaging with beautiful UI and robust features.

## ✨ Features

- **🔐 Custom JWT Authentication**: Secure authentication system without relying on 3rd-party auth providers
- **⚡ Real-time Messaging**: Instant message delivery powered by Socket.io
- **🟢 Online/Offline Presence**: Real-time user status indicators
- **🔔 Notification & Typing Sounds**: Audio feedback with toggle controls
- **📨 Welcome Emails**: Automated email sending on user signup using Resend
- **🗂️ Image Uploads**: Support for media sharing via Cloudinary integration
- **🧰 REST API**: Clean API architecture with Node.js & Express
- **🧱 MongoDB**: Scalable data persistence for messages and user data
- **🚦 API Rate-Limiting**: Protection against abuse powered by Arcjet
- **🎨 Beautiful UI**: Modern interface with React, Tailwind CSS & DaisyUI
- **🧠 Zustand**: Efficient state management solution
- **🧑‍💻 Git & GitHub Workflow**: Organized development with branches, PRs, and merges

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend framework for user interface |
| Node.js & Express | Backend server and API development |
| Socket.io | Real-time bidirectional communication |
| MongoDB | Database for users, messages, and chats |
| JWT | Secure authentication tokens |
| Cloudinary | Image and file upload management |
| Resend | Transactional email service |
| Arcjet | API rate limiting and protection |
| Tailwind CSS & DaisyUI | Modern styling and UI components |
| Zustand | Lightweight state management |

## 📋 API Endpoints

### POST /api/auth/register
Creates a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "fullName": "johndoe"
}
```
# API Documentation

## Authentication

### POST /api/auth/login
Authenticates user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
