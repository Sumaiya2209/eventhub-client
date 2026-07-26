# EventHub – Event Management Platform

EventHub is a full-stack event management web application where users can explore, create, join, and manage events, while admins oversee platform-wide event and user management. The platform features secure authentication with Google OAuth and bearer-token-based cross-origin authentication for production environments.

**Live Site:** https://eventhub-client.vercel.app


---

## 📌 Overview

EventHub allows users to discover events happening around them, register or create their own events, and manage them through a personalized dashboard. Admins have full control over platform content, user roles, and event moderation through a dedicated Admin Panel.

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Google OAuth integration with bearer token-based authentication, enabling secure cross-origin requests in production
- 🗂️ **Role-Based Access Control** — Separate views and permissions for regular users and admins
- 🎉 **Explore Events** — Browse, search, and filter events by category, date, and popularity
- ➕ **Add & Manage Events** — Users can create, update, and delete their own events with image uploads
- 🛠️ **Admin Panel** — Manage all users, approve/reject events, and monitor platform activity
- 🏠 **Dynamic Homepage** — Seven interactive sections showcasing featured, upcoming, and trending events
- 📱 **Fully Responsive Design** — Optimized for mobile, tablet, and desktop devices
- ⚡ **Real-Time Updates** — Live reflection of event changes across the platform

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js
- TypeScript
- Tailwind CSS
- React Hook Form

**Backend:**
- Node.js
- Express.js
- MongoDB

**Authentication:**
- Better Auth
- Google OAuth
- Bearer Token Authentication (Cross-Origin)

**Deployment:**
- Vercel (Frontend & Backend)

---

## 📂 Project Structure

```
eventhub-client/
├── app/                  # Next.js app router pages
│   ├── (home)/           # Homepage sections
│   ├── explore/          # Explore events page
│   ├── add-event/        # Add event page
│   ├── manage-events/    # Manage user's events
│   ├── admin/            # Admin panel
│   └── auth/             # Login & registration pages
├── components/           # Reusable UI components
├── lib/                  # Utility functions & auth config
├── public/                # Static assets
└── package.json

eventhub-server/
├── src/
│   ├── routes/           # API route handlers
│   ├── controllers/      # Business logic
│   ├── models/           # MongoDB schemas
│   ├── middlewares/      # Auth & role verification middleware
│   └── config/           # Database & environment config
├── api/
│   └── index.ts          # Serverless entry point
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB Atlas account
- Google Cloud Console project (for OAuth credentials)

### Installation

**1. Clone the repositories**
```bash
git clone <client-repo-url>
git clone <server-repo-url>
```

**2. Install dependencies**

Client:
```bash
cd eventhub-client
npm install
```

Server:
```bash
cd eventhub-server
npm install
```

**3. Set up environment variables**

Create a `.env` file in the client root:
```env
NEXT_PUBLIC_API_URL=your_server_url
NEXT_PUBLIC_AUTH_URL=your_auth_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Create a `.env` file in the server root:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
CLIENT_URL=your_client_url
```

**4. Run the development servers**

Client:
```bash
npm run dev
```

Server:
```bash
npm run dev
```

The client will run on `http://localhost:3000` and the server on `http://localhost:5000`.

---

## 🔑 Authentication Flow

1. Users can sign up or log in using **email/password** or **Google OAuth**
2. Upon successful login, a **bearer token** is issued and stored securely
3. All protected API requests include the bearer token in the `Authorization` header
4. Middleware on the server verifies the token and user role before granting access to protected routes

---

## 🧑‍💻 User Roles

| Role  | Permissions |
|-------|-------------|
| User  | Explore events, create/manage own events, register for events |
| Admin | Manage all events, manage users, approve/reject event submissions |

---

## 📸 Screenshots

*(Add screenshots of the homepage, explore page, dashboard, and admin panel here)*

---

## 🚀 Future Improvements

- Add payment integration for paid/premium events
- Implement email notifications and reminders for upcoming events
- Add event analytics dashboard for organizers

---

## 👩‍💻 Author

**Jannat**
- GitHub: [Sumaiya2209](https://github.com/Sumaiya2209)
- Email: sumaiyajannat2209@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
