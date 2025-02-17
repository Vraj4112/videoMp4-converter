# Video Processing App

Welcome to the Video Processing App!.

---

## Important Notes

- **Local Setup Only**: This setup is intended for local development, not for production.
- **Storage**: Streams are not implemented. To handle storage, disk storage is used instead of memory storage which we generally use in production world.
- **IDE**: vsCode is recommended. The app uses design patterns(modular monolith) for scalability.

---

## Prerequisites

Ensure you have the following software installed:

- Node.js (>= 14.x)
- npm (Node Package Manager)
- Chocolatey (for installing FFmpeg and Redis on Windows)
- Redis (for queue management)
- FFmpeg

---

## Getting Started

### 1. Install Dependencies

- npm install

### 2. Install Chocolatey (Windows Only)

# bash run following command in cmd or powershell in windows

- Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

### 3. Install FFmpeg

# bash run following command in cmd or powershell in windows

- choco install ffmpeg-full

### 4. Install Redis

# bash run following command in cmd or powershell in windows

- choco install redis

# Start Redis Server with this command in cmd in windows

- redis-server

### 5. Set Up MongoDB

# Bash run docker command

- docker run --name mongodb -p 27017:27017 -d mongo

### 6. Environment Configuration

# Bash

- cp .env.example .env.development.local

- NODE_ENV=development
- PORT=3002
- MONGODB_URI=mongodb://localhost:27017/video_app
- EMAIL_USER=your-email@gmail.com
- EMAIL_PASS=your-app-password

### 7. Setting Up App Password for Gmail

## To use Nodemailer with Gmail, you need to set up an App Password:

# Enable 2-Step Verification:

- Go to your Google Account.

- Under "Security," select "2-Step Verification" and follow the instructions to set it up.

# Generate App Password:

- After enabling 2-Step Verification, return to the "Security" section.

- Under "Signing in to Google," select "App Passwords."

- Select the app (e.g., "Mail") and device (e.g., "Other (Custom name)").

- Generate the app password and note it down.

### 8. Start the Application

# Bash

- npm start // this should start server on http://localhost:3002

### 9. API Endpoints

## POST - Home route to upload videos:

- Request upload form data including email for notification and videos to convert.

- http://localhost:3002/api/videos/upload

## GET - Get all video list:

- Full list of videos.

- http://localhost:3002/api/videos

## GET - Get video details by ID:

- Single video by ID.

- http://localhost:3002/api/videos/:id/status

## Features

- Video upload and processing

- Real-time progress updates

- View converted videos

- Secure with Helmet

- Rate limiting to prevent abuse

## Usage

- **Upload Videos**: Go to the home page and upload videos.

- **View Progress**: Monitor the real-time progress of video conversions.

- **Access Converted Videos**: Click on the link to view the converted videos once processing is completed.
