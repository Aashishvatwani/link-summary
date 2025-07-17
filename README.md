🔗 Link Saver + Auto Summary
A simple and elegant bookmarking app that allows users to save, auto-summarize, and manage their favorite web links. Supports light/dark theme toggling and includes user authentication and dashboard functionality.

  Features
🔖 Save bookmarks with title, favicon, and summary

🌓 Dark/Light theme toggle with system preference detection

🧠 AI-generated summaries for each link

🗑️ Delete bookmarks

🔐 Authentication (Login / Signup)

 Fast, responsive UI built with Next.js App Router

📁 Project Structure
bash
Copy
Edit
.
├── app/
│   ├── layout.tsx             # Global layout
│   ├── page.tsx               # Home page
│   ├── dashboard/page.tsx     # Dashboard for saved bookmarks
│   ├── login/page.tsx         # Login page
│   ├── signup/page.tsx        # Signup page
│   ├── api/bookmarks/         # API routes for bookmarks
│
├── components/
│   └── BookmarkCard.tsx       # UI component for a single bookmark
│
├── hooks/
│   └── useTheme.ts            # Custom hook for theme management
│
├── public/                    # Public assets (if any)
├── styles/
│   └── globals.css            # Tailwind base styles
├── tailwind.config.js         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
└── README.md
 Getting Started
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/your-username/link-saver.git
cd link-saver
2. Install dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. Run locally
bash
Copy
Edit
npm run dev
# or
yarn dev
App will be available at: http://localhost:3000

 Tech Stack
Framework: Next.js 13+ App Router

Styling: Tailwind CSS

State/Theme: React useState + custom hook

API: Next.js API Routes (can be swapped with Express, Appwrite, etc.)

TypeScript: Fully typed for safety and scalability

 Theme Handling
Dark mode is managed using the class strategy in Tailwind. A custom hook (useTheme.ts) syncs the theme with system preferences and user interaction.

 To Do / Improvements
 AI summary generation using OpenAI / Langchain

 Persistent theme preference using localStorage

 Tagging and search/filter bookmarks

 Bookmark categories or folders

 Authentication via Firebase / Auth.js

 Responsive mobile design enhancements

 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

 License
MIT © Aashish
