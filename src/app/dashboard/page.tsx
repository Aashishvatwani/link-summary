'use client';

import { useState, useEffect } from 'react';
import BookmarkCard from '@/components/BookmarkCard';
type Bookmark = {
  _id: string;
  title: string;
  summary: string;
  url: string;
  favicon: string;
};
export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const [error, setError] = useState<string | null>(null); // New state for error messages

  const fetchBookmarks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/bookmark');

      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch bookmarks');
      }

      const data = await res.json();
      setBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      setError( 'An error occurred while fetching bookmarks.');
    } finally {
      setLoading(false);
    }
  };


  const saveBookmark = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL.');
      return;
    }

    try {
      setError(null); // Clear previous errors
      const res = await fetch('/api/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        // Attempt to read error message from response body
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save bookmark.');
      }

      setUrl(''); // Clear input on success
      fetchBookmarks(); // Refresh the list
    } catch (error) {
      console.error(`Failed to save: ${error}`);
      setError( 'An error occurred while saving the bookmark.');
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      setError(null); // Clear previous errors
      const res = await fetch(`/api/bookmark/${id}`, {
      method: 'DELETE',
    });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete bookmark.');
      }
      fetchBookmarks(); // Refresh the list after deletion
    } catch (error) {
      console.error(`Failed to delete: ${error}`);
      setError( 'An error occurred while deleting the bookmark.');
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto min-h-screen"> {/* Increased max-width, adjusted padding */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6 sm:mb-8 text-center dark:text-blue-400">
        🔗 Saved Bookmarks
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 items-stretch"> {/* Added items-stretch */}
        <input
          type="url"
          placeholder="Enter a URL to save"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { // Allow saving with Enter key
            if (e.key === 'Enter') {
              saveBookmark();
            }
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 text-base sm:text-lg"
        />
        <button
          onClick={saveBookmark}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200
                     dark:bg-blue-700 dark:hover:bg-blue-800 flex-shrink-0 text-base sm:text-lg"
        >
          Save
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6"> {/* Responsive grid */}
        {loading ? (
          <p className="text-gray-500 text-center col-span-full">Loading bookmarks...</p>
        ) : bookmarks.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No bookmarks saved yet. Add one above! 😄</p>
        ) : (
          bookmarks.map((bm: Bookmark) => (
            <BookmarkCard
              key={bm._id}
              title={bm.title}
              summary={bm.summary}
              url={bm.url}
              favicon={bm.favicon}
              onDelete={() => deleteBookmark(bm._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
