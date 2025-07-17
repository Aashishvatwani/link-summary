// app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';


export const metadata = {
  title: 'Link Saver + Auto Summary',
  description: 'Save and summarize your bookmarks',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-all">

        <main className="max-w-4xl mx-auto py-8 px-4" >
          {children}
        </main>
      </body>
    </html>
  );
}
