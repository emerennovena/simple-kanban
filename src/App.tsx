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
  const [showInput, setShowInput ] = useState(false);
  const [cardInputs, setCardInputs] = useState<{ [key: string]: string }>({});

  const handleAddClick = () => {
    const newContainerId = crypto.randomUUID();
    if(!showInput){
      setShowInput(true);
      return;
    }

    setCardInputs({ ...cardInputs, [newContainerId]: ''});
    
    if(containerTitle.trim() === ''){return}
    setContainers([
      ...containers,
      {id: crypto.randomUUID(), title: containerTitle, cards: [],}
    ]);
    
    setContainerTitle('');
    setShowInput(false);
  };

const addCard = (containerId: string) => {
  const cardContent = cardInputs[containerId];
  if (!cardContent || cardContent.trim() === '') return;

  setContainers(containers.map((col) => 
    col.id === containerId
      ? {
          ...col,
          cards: [
            ...col.cards,
            { id: crypto.randomUUID(), title: cardContent },
          ],
        }
      : col
  ));

  setCardInputs({ ...cardInputs, [containerId]: ''});
};


  return (
  <div className="App">
    <h2>Kanban</h2>
    <div className='board'>
    <button onClick={handleAddClick}>
      { showInput ? 'Save Container' : 'Add Container'}
    </button>

    {showInput && (
      <input
        value={containerTitle}
        onChange={(e) => setContainerTitle(e.target.value)}
        placeholder='Enter Container Title'
        style={{padding:8, marginTop:8}}
      />
    )}

    {containers.map((col) => (
      <div className="list-container" key={col.id}>
        <h2>{col.title}</h2>

        {col.cards.map((card) => (
           
          <div className="list-card" key={card.id}>
          {card.title}
          </div>
    
        ))}
        <input
          value={cardInputs[col.id] || ''}
          onChange={(e) => setCardInputs({ ...cardInputs, [col.id]: e.target.value})}
          placeholder='Enter card content'
        />
        <button onClick={() => addCard(col.id)}>
          Add Card
        </button>
      </div>
    ))}   

  </div>
  </div>
  );
}

export default App;
