import React, { useState } from 'react';
import './App.css';

interface Card {
  id: string;
  title: string;
}

interface Container {
  id: string;
  title: string;
  cards: Card[];
}

function App() {
  const [containers, setContainers] = useState<Container[]>([])
  const [containerTitle, setContainerTitle] = useState('');

  const addContainer = () => {
    if(containerTitle.trim() === ""){return}

    setContainers([
      ...containers,
      { id: crypto.randomUUID(), title: containerTitle, cards: []},
    ]);
    setContainerTitle("");
  }

  return (
  <div className="App">
    <h2>Trello Clone</h2>

    <input
      value={containerTitle}
      onChange={(e) => setContainerTitle(e.target.value)}
      placeholder='Enter Container Title'
      style={{ padding: 8, marginRight: 8}}
    />
   
    <button onClick={addContainer}>Add Container</button>
      {containers.map((col) => (
    <div className='list-container'>
          <h2>{col.title}</h2>
    </div>
      ))}

</div>
  );
}

export default App;
