import React, { useState } from 'react';
import './App.css';

interface Card {
  id: string;
  content: string;
}

interface List {
  id: string;
  title: string;
  cards: Card[];
}

function App() {
  const [lists, setLists] = useState<List[]>([])
  const [newCardContent, setNewCardContent] = useState('');
  const [newListTitle, setNewListTitle] = useState('');

  const addCard = (listId:string) => {
    if(newCardContent.trim() === ''){return}
    const updatedLists = lists.map(list => {
      if(list.id === listId){
        return{
          ...list,
          cards: [...list.cards, {
            id: Date.now().toString(),
            content: newCardContent
          }]
        };
      }
      return list;
    })
    setLists(updatedLists);
    setNewCardContent('');
  }

  const addList = () => {
    if(newListTitle.trim() === ''){return}
    const newList:List = {
      id: Date.now().toString(),
      title: newListTitle,
      cards:[]
    };
    setLists([...lists, newList]);
    setNewListTitle('');
  }

  const deleteList = (listId:string) => {
    const updatedLists = lists.filter(list => list.id != listId);
    setLists(updatedLists);
  }

  return (
    <div className="App">
    <h1>Trello Clone</h1>
    <div className="add-list">
      <input 
      type="text"
      value={newListTitle}
      onChange={e => setNewListTitle(e.target.value)}
      placeholder='Add list title'
      />
      <button onClick={addList}>Add List</button>
    </div>
    
    <div className="list-container">
      {lists.map(list => (
        <div
          key={list.id}
          className="list"
          >
        <h2>{list.title}</h2>
        <button onClick={() => deleteList(list.id)}>Delete Title</button>
        <div className="card-content">
        </div>
        </div>
        
      ))}
    </div>
    </div>
  );
}

export default App;
