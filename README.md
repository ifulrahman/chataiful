# Chataiful – Fullstack AI Chat Platform

## 📌 Overview

Chataiful is a modern **Fullstack AI Chat Platform** built with Next.js 15, React 19, and MongoDB.  
It integrates authentication, real-time messaging, and AI-generated responses using OpenAI/DeepSeek APIs.  
This project is designed as a scalable base for building **AI-powered assistants** or chatbots with secure auth and a clean UI.

🔗 **Live Preview: [https://chataiful.vercel.app](https://chataiful.vercel.app)**

---

## Screenshots
![screenshot-1](ss-1.jpg)
![screenshot-2](ss-2.jpg)
![screenshot-3](ss-3.jpg)

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** – React framework with Turbopack bundler.
- **React 19** – Latest React version for UI.
- **Tailwind CSS v4** – Utility-first CSS for responsive modern design.
- **React Markdown** – Render markdown text from AI output.
- **Prism.js** – https://github.com/PrismJS/prism-themes/tree/master/themes - Syntax highlighting for code snippets.
- **React Hot Toast** – Notifications for user feedback.

### Backend
- **Next.js API Routes** – Backend logic using built-in API routes.
- **Mongoose via MongoDB Atlas** – https://www.mongodb.com/products/platform/atlas-database - ODM for MongoDB, managing chats and users.
- **Svix** – Webhooks handling (commonly paired with Clerk).
- **Axios** – Simplified HTTP client for API calls.

### Authentication
- **Clerk** – https://clerk.com - Secure login, session management, and SSO.

### AI Integration
- **OpenAI SDK** – https://api-docs.deepseek.com - https://openrouter.ai/settings/keys - Connect to OpenAI-compatible APIs (e.g. DeepSeek, OpenRouter).

---



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
