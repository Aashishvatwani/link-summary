import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export const metadata = {
  title: 'Link Saver',
  description: 'Securely save and manage your favorite links with style!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-screen text-gray-800 dark:text-gray-100 transition-colors duration-300 ease-in-out">
        <header className="w-full p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg fixed top-0 left-0 z-50">
          <nav className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform duration-200">
              🔗 Link Saver
            </Link>
            <div className="space-x-auto">
              <LogoutButton />
            </div>
          </nav>
        </header>
        
        {/* Spacer for fixed header */}
        <div className="h-20" />
        
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
