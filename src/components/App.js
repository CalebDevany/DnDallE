import './App.css';
import React from 'react';
import DALLE2 from './Dalle2';
import ChatGPTCharacter from './ChatGPTCharacter';
import ChatGPTMonster from './ChatGPTMonster';


function App() {
  return (
    <div className="main">
      <ChatGPTCharacter />
      <ChatGPTMonster />
      <DALLE2 />
      <footer>
        <p>&copy; 2023 DnDALLE</p>
      </footer>
    </div>
  );
}

export default App;