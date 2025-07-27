'use client';
import { useState } from "react";
import WishInput from "./components/WishInput";

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
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-3xl bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-200">

        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">📦 Inventory Manager</h1>

        {/* List of items */}
        <ul className="space-y-2">
          {items.map(i => (
            <li
              key={i.thing}
              data-key={i.thing}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border"
            >
              <span className="text-gray-700">{i.thing} - {i.qty}</span>
              <Btn onClick={deleteItem} text="✕" className="bg-red-500 hover:bg-red-600 px-2 py-1 text-xs" />
            </li>
          ))}
        </ul>

        <hr className="border-t" />

        {/* Add new item */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <input
            placeholder="New item"
            value={newItem}
            onChange={changeNewItem}
            className="w-full sm:w-1/2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Quantity"
            type="number"
            value={newQty}
            onChange={changeNewQty}
            className="w-full sm:w-1/3 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Btn text="Add" onClick={addItem} />
        </div>
      </div>

      {/* Wish input form below */}
      <div className="mt-10">
        <WishInput />
      </div>
    </main>
  );
}
