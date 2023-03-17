import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DALLE2() {
  const [characterImage, setCharacterImage] = useState('');
  const [mapImage, setMapImage] = useState('');
  const [characterResponse, setCharacterResponse] = useState('');
  const [mapResponse, setMapResponse] = useState('');

  const handleCharacterChange = (event) => {
    setCharacterResponse(event.target.value);
  };

  const handleMapChange = (event) => {
    setMapResponse(event.target.value);
  };

  const handleCharacterSubmit = (event) => {
    event.preventDefault();
    axios.post('https://api.openai.com/v1/images/generations', {
      model: 'image-alpha-001',
      prompt: `DnD character ${characterResponse}`,
      num_images: 1,
      size: '512x512',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_DALLE2_API_KEY_HERE'
      }
    })
      .then((response) => {
        setCharacterImage(response.data.data[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMapSubmit = (event) => {
    event.preventDefault();
    axios.post('https://api.openai.com/v1/images/generations', {
      model: 'image-alpha-001',
      prompt: `DnD map ${mapResponse}`,
      num_images: 1,
      size: '512x512',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_DALLE2_API_KEY_HERE'
      }
    })
      .then((response) => {
        setMapImage(response.data.data[0].url);
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
          <input type="text" value={characterResponse} onChange={handleCharacterChange} />
        </label>
        <button type="submit">Generate Character</button>
      </form>
      <div>
        {characterImage ? (
          <img src={characterImage} alt="Generated Character" />
        ) : null}
      </div>

      <form onSubmit={handleMapSubmit}>
        <label>
          Enter a DnD map description:
          <input type="text" value={mapResponse} onChange={handleMapChange} />
        </label>
        <button type="submit">Generate Map</button>
      </form>
      <div>
        {mapImage ? (
          <img src={mapImage} alt="Generated Map" />
        ) : null}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <DALLE2 />
    </div>
  );
}

export default DALLE2;
