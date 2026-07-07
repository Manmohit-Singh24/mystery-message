<h1 align="center">
  <img src="public/icon-light.svg" alt="Just-Say" width="60px" />
  <br />
  Just-Say
</h1>

<p align="center">
  <b>Don't gossip, just say it.</b>
</p>

<p align="center">
  A link-based messaging platform supporting authenticated, anonymous, and truly anonymous conversations.
</p>

<p align="center">
  <a href="https://just-say-m24.vercel.app/">Live Demo</a>
</p>

## Overview

Just-Say is a full-stack, shareable link-based messaging platform where users receive messages through their personalized public link. The platform extends the traditional anonymous messaging concept by supporting three distinct communication modes:

- **Authenticated** – the sender's identity is visible to the recipient.
- **Anonymous** – authenticated users can hide their identity while the system still maintains sender information.
- **Truly Anonymous** – messages are stored without any association to a sender, ensuring the sender's identity cannot be recovered later.

Beyond messaging, Just-Say provides complete user management workflows including email verification, account activation, password reset, guest logins, JWT-based session management, and login alerts.

Users can manage sent and received messages through personalized dashboards featuring cursor-based pagination, delivery/read tracking, configurable message acceptance, AI-assisted message generation using the Gemini API, and backend APIs powered by MongoDB aggregation pipelines with Zod-based request validation.

---

## Features

### Messaging

- Shareable public profile links for receiving messages
- Three messaging modes:
  - **Authenticated** – sender identity is visible
  - **Anonymous** – sender identity is hidden from the recipient
  - **Truly Anonymous** – messages are stored without any sender association
- AI-assisted message generation powered by the Gemini API
- Delivery and read status tracking
- Sender and receiver message management
- Configurable message acceptance controls

| Feature                              | Authenticated | Anonymous | Truly Anonymous |
| ------------------------------------ | :-----------: | :-------: | :-------------: |
| Sender visible to recipient          |      ✅       |    ❌     |       ❌        |
| Sender identity stored by the system |      ✅       |    ✅     |       ❌        |
| Delete for Everyone                  |      ✅       |    ✅     |       ❌        |

---

### User Management

- User registration and authentication
- Email verification and account activation
- Guest login support
- JWT-based session management
- Password reset workflow
- Login notifications via email

---

### Dashboard

- Personalized user dashboard
- View sent and received messages
- Cursor-based pagination for efficient message browsing
- Manage incoming and outgoing messages

---

### Backend

- RESTful API routes built with Next.js
- MongoDB aggregation pipelines for efficient data retrieval
- Zod-based request validation
- Modular utility functions for authentication, email, and API responses

---

## Tech Stack

| Category           | Technologies                                        | Purpose                                                     |
| ------------------ | --------------------------------------------------- | ----------------------------------------------------------- |
| **Frontend**       | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui | User interface and client-side interactions                 |
| **Backend**        | Next.js API Routes                                  | Backend APIs and business logic                             |
| **Database**       | MongoDB, Mongoose                                   | Data modeling and persistence                               |
| **Authentication** | NextAuth.js, JWT                                    | User authentication and session management                  |
| **Validation**     | Zod                                                 | Request validation and schema enforcement                   |
| **AI Integration** | Google Gemini API, Vercel AI SDK                    | AI-assisted message generation                              |
| **Email**          | Nodemailer, React Email                             | Verification, password reset, and login notification emails |
| **Deployment**     | Vercel                                              | Application hosting and deployment                          |

---

## Running Locally

### Prerequisites

- Node.js
- MongoDB
- pnpm

### Installation

```bash
git clone https://github.com/manmohit-24/just-say.git
cd just-say
pnpm install
```

### Configure Environment Variables

Create a `.env` file in the project root by copying the example file:

```bash
cp .env.sample .env
```

Then configure the following environment variables:

| Variable                       | Description                                                                 |
| ------------------------------ | --------------------------------------------------------------------------- |
| `MONGODB_URI`                  | MongoDB connection string                                                   |
| `NEXTAUTH_SECRET`              | Secret used to sign and encrypt authentication sessions                     |
| `NEXT_PUBLIC_APP_URL`          | Public URL of the application (e.g. `http://localhost:3000` in development) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | API key for Google Gemini AI                                                |
| `GMAIL_USER`                   | Gmail account used to send transactional emails                             |
| `GMAIL_PASS`                   | Gmail App Password used by Nodemailer                                       |
| `SUPPORT_EMAIL`                | Contact email displayed in application emails                               |

### Start the Development Server

```bash
pnpm dev
```

The application will be available at: [http://localhost:3000](http://localhost:3000)

---

## Acknowledgements

This project was initially inspired by Hitesh Choudhary's Next.js tutorial series. While the tutorial provided the starting point, the application has since evolved with custom messaging workflows, authentication features, AI integration, and backend logic.

---

If you have suggestions, encounter a bug, or would like to contribute, feel free to open an issue or submit a pull request.
