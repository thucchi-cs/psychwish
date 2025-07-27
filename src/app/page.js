'use client';
import { useState } from "react";
import WishInput from './components/WishInput'

let loaded = false;

export default function Home() {
  const query = async () => {
    const response = await fetch("/api/getData");
    const result = await response.json();
    return Object.values(result.data);
  };

  const addItem = async () => {
    if (newItem.trim() === "" || newQty.trim() === "") {
      return false;
    }
    await fetch("/api/addData", {
      method: "POST",
      body: JSON.stringify({ thing: newItem, qty: newQty })
    });

    setNewItem("");
    setNewQty("");
    return true;
  };

  const deleteItem = async (e) => {
    const item = e.target.closest('[data-key]');
    const key = item?.getAttribute('data-key');
    if (!key) return false;

    await fetch("/api/deleteData", {
      method: "POST",
      body: JSON.stringify({ thing: key })
    });

    return true;
  };

  const [items, setItems] = useState([]);
  const updateList = async () => {
    setItems(await query());
  };

  if (!loaded) {
    updateList();
    loaded = true;
  }

  const [newItem, setNewItem] = useState("");
  const [newQty, setNewQty] = useState("");
  const changeNewItem = (e) => setNewItem(e.target.value);
  const changeNewQty = (e) => setNewQty(e.target.value);

  const Btn = ({ text, onClick, className }) => (
    <button
      onClick={async (e) => {
        if (await onClick(e)) {
          await updateList();
        }
      }}
      className={`px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all ${className}`}
    >
      {text}
    </button>
  );

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-xl p-10 border border-gray-200 space-y-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">🧠 Psychology Quiz</h1>
          <p className="text-gray-600 text-lg">Ready to learn more about your mind? Tap below to begin your quiz.</p>
          
          <a
            href="/quiz"
            className="inline-block px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-lg shadow-md transition duration-200"
          >
            Start Quiz
          </a>
        </div>
      </main>
    );
}
