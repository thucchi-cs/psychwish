'use client';
import { useState } from "react";

let loaded = false;

export default function Home() {
  const [x, setX] = useState("");
  const query = async () => {
    const response = await fetch("/api/getData");
    const result = await response.json();
    console.log("SUP");
    const arr = [1, 324, 2]
    console.log(arr)
    console.log(Object.values(result.data));
    setX(result.data[0].thing);
    return Object.values(result.data)
  }

  const [items, setItems] = useState([]);
  const updateList = async() => {
    setItems(await query())
    console.log(":DFJIRGHRBUINV")
    console.log(items)
  }

  const [newItem, setNewItem] = useState("");
  const [newQty, setNewQty] = useState("");
  const changeNewItem = (e) => setNewItem(e.target.value);
  const changeNewQty = (e) => setNewQty(e.target.value);
  
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

  if (!loaded) {
    updateList()
    console.log("HEY THERE_______")
    loaded = true;
  }

  const Btn = ({text, onClick}) => (
    <button onClick={async() => {
      if(await onClick()) {
        await updateList();
      }
    }}>{text}</button>
  )

  return (
    <div>
      <h1>Hello</h1>
      {items.map(i => (
        <li key={i.thing}>{i.thing} - {i.qty}</li>
      ))}
      <div>
        <input placeholder="new item" onChange={changeNewItem} value={newItem}></input>
        <input placeholder="quantity" type="number" onChange={changeNewQty} value={newQty}></input>
        <Btn text="Add" onClick={addItem}></Btn>
      </div>
      <p>{x}</p>
      <hr></hr>
    </div>
  );
}