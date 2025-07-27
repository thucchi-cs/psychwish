//wish input asks the user for their 'wish' or goal, retrieves it and submits to the api for AI to respond.
import { useState } from "react";

const [userInput, setUserInput] = useState("");
const [error, setError] =  useState<string | null>(null);
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  //if input does not exist
  if (!userInput.trim()) return;

  console.log("This is what the user entered: ", userInput);
  setError(null);
  setIsSubmitting(true);

  try {
    const res = await fetch("/api/ai-responses/wishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput }),
    });

    if (!res.ok) {
      //get error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const newWish = await response.json();
      console.log(newWish);

      // Reset the form
      setUserInput('');
    }
  } 
    catch (err) {
      if (err) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } 
      finally {
      setIsSubmitting(false);
      };
}

  export default async function WishInput() {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl shadow-lg">
            <div className="text-center">
              <h2 className="font-headline text-3xl">Make a Wish</h2>
              <label className="font-body text-base">
                Cast your deepest desire into the well and await a reflection.
              </label>
            </div>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isSubmitting}
              type="text"
              className="min-h-32 resize-none rounded-lg border-2 bg-transparent text-lg"
              placeholder="I wish for..."
            />

            <button type="submit" className="btn-primary btn">
              {isSubmitting ? (
                            <div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : ('Submit Wish')}
            </button>
          </div>
        </form>
       {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </>
    );
  }
