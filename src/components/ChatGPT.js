import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@material/web/button/filled-button.js';


function ChatGPT() {
  const [characterMessage, setCharacterMessage] = useState('');
  const [dialogueMessage, setDialogueMessage] = useState('');
  const [characterResponse, setCharacterResponse] = useState('');
  const [dialogueResponse, setDialogueResponse] = useState('');

  const handleCharacterChange = (event) => {
    setCharacterMessage(event.target.value);
  };

  const handleDialogueChange = (event) => {
    setDialogueMessage(event.target.value);
  };

  const handleCharacterSubmit = (event) => {
    event.preventDefault();
    axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: characterMessage,
      max_tokens: 60,
      n: 1,
      stop: ['\n']
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_CHATGPT_API_KEY_HERE'
      }
    })
      .then((response) => {
        setCharacterResponse(response.data.choices[0].text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDialogueSubmit = (event) => {
    event.preventDefault();
    axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: dialogueMessage,
      max_tokens: 60,
      n: 1,
      stop: ['\n']
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_CHATGPT_API_KEY_HERE'
      }
    })
      .then((response) => {
        setDialogueResponse(response.data.choices[0].text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleCharacterSubmit}>
        <label>
          Enter a DnD character description:
          <input type="text" value={characterMessage} onChange={handleCharacterChange} />
        </label>
        <md-outlined-button label="Submit">Generate Character</md-outlined-button>
      </form>
      <div>{characterResponse}</div>

      <form onSubmit={handleDialogueSubmit}>
        <label>
          Enter dialogue for your character:
          <input type="text" value={dialogueMessage} onChange={handleDialogueChange} />
        </label>
        <button type="submit">Generate Dialogue</button>
      </form>
      <div>{dialogueResponse}</div>
    </div>
  );
}

export default ChatGPT;
