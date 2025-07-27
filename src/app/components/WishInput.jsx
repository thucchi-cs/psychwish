'use client';
import { useState } from "react";

export default function WishInput() {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    setError('');
    setIsSubmitting(true);
    setAiResponse('');

   try {
      const response = await fetch("/api/wishes/ai-responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const newWish = await response.json();
      setAiResponse(newWish.output); // expects { output: "..." }
      setShowModal(true);
      setUserInput('');
    } catch (err) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl space-y-6 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl p-6 border border-gray-200"
        >
          <div className="text-center">
            <h2 className="font-semibold text-3xl text-gray-800">✨ Make a Wish</h2>
            <p className="mt-1 text-gray-600 text-sm">
              Cast your wish or goal into the well and await a reflection.
            </p>
          </div>

          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isSubmitting}
            placeholder="I wish for..."
            className="w-full min-h-[120px] rounded-lg border border-gray-300 bg-gray-100 p-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-400"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Submit Wish'
              )}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">🌠 Reflection</h3>
            <p className="text-gray-700">{aiResponse}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
