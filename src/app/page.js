'use client';
import { useState } from "react";

let loaded = false;

export default function Home() {
  // get data from database
  const query = async () => {
    const response = await fetch("/api/getData");
    const result = await response.json();
    return Object.values(result.data);
  }

  // add item to database
  const addItem = async() => {
    const thing = newItem;
    const qty = newQty;
    if (thing == "" || qty == "") {
      return false;
    }
    await fetch("/api/addData", {
      method: "POST",
      body: JSON.stringify({thing: thing, qty: qty})
    });
    
    setNewItem("");
    setNewQty("");
    return true;
  }
  
  // delete item from database
  const deleteItem = async(e) => {
    const item = e.target.parentElement;
    const key = Object.values(item)[0].key;
    await fetch("/api/deleteData", {
      method: "POST",
      body: JSON.stringify({thing: key})
    });

    return true;
  }

  // list of items
  const [items, setItems] = useState([]);

  // update current list by querying database
  const updateList = async() => {
    setItems(await query());
  }

  // initialize list if not already
  if (!loaded) {
    updateList()
    loaded = true;
  }
  
  // values of new items being added
  const [newItem, setNewItem] = useState("");
  const [newQty, setNewQty] = useState("");
  const changeNewItem = (e) => setNewItem(e.target.value);
  const changeNewQty = (e) => setNewQty(e.target.value);

  // buttons that will update the list after an action
  const Btn = ({text, onClick}) => (
    <button onClick={async(e) => {
      if(await onClick(e)) {
        await updateList();
      }
    }}>{text}</button>
  )

  return (
    <>
    <div>

      <h1>Hello</h1>
      <a href="/quiz">quiz</a>

      {items.map(i => (
        <div key={i.thing}>
          <Btn onClick={deleteItem} text="x" className="inline"></Btn>
          <li className="inline">{i.thing} - {i.qty}</li>
        </div>
      ))}
      <hr></hr>

      <div>
        <input placeholder="new item" onChange={changeNewItem} value={newItem}></input>
        <input placeholder="quantity" type="number" onChange={changeNewQty} value={newQty}></input>
        <Btn text="Add" onClick={addItem}></Btn>
      </div>

    </div>
    </>
  );
}