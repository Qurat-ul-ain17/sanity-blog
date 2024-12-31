
'use client';
import { useState } from 'react';

export default function CommentSection() {
  const [comments, setComments] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addComment = () => {
    if (input.trim()) {
      setComments([...comments, input]);
      setInput('');
    }
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">💬 Join the Discussion</h2>
      {/* Input Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Leave a Comment</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your comment here..."
            className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addComment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-all"
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                {comment.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-gray-700">{comment}</p>
                <span className="text-sm text-gray-400">Just now</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-center">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
}