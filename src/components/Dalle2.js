import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function DALLE2() {
  const [characterImage, setCharacterImage] = useState("");
  const [mapImage, setMapImage] = useState("");
  const [monsterImage, setMonsterImage] = useState("");
  const [characterResponse, setCharacterResponse] = useState("");
  const [mapResponse, setMapResponse] = useState("");
  const [monsterResponse, setMonsterResponse] = useState("");

  const handleCharacterChange = (event) => {
    setCharacterResponse(event.target.value);
  };

  const handleMapChange = (event) => {
    setMapResponse(event.target.value);
  };

  const handleMonsterChange = (event) => {
    setMonsterResponse(event.target.value);
  };

  const handleCharacterSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "image-alpha-001",
          prompt:
          `Photorealistic portrait of DnD character ${characterResponse}`,
          num_images: 1,
          size: "512x512",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer {API-KEY}",
          },
        }
      )
      .then((response) => {
        setCharacterImage(response.data.data[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMapSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "image-alpha-001",
          prompt:
          `Simple Dungeons and Dragons map in the style of Roll20 ${mapResponse}`,
          num_images: 1,
          size: "1024x1024",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer {API-KEY}",
          },
        }
      )
      .then((response) => {
        setMapImage(response.data.data[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMonsterSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "image-alpha-001",
          prompt: `Photorealistic portrait of DnD monster ${monsterResponse}`,
          num_images: 1,
          size: "512x512",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer {API-KEY}",
          },
        }
      )
      .then((response) => {
        setMonsterImage(response.data.data[0].url);
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
          <input
            type="text"
            value={characterResponse}
            onChange={handleCharacterChange}
          />
        </label>
        <button type="submit">Generate Character Image</button>
      </form>

      {characterImage && <img src={characterImage} alt="DnD character" />}
      <form onSubmit={handleMapSubmit}>
        <label>
          Enter a DnD map description:
          <input type="text" value={mapResponse} onChange={handleMapChange} />
        </label>
        <button type="submit">Generate Map Image</button>
      </form>

      {mapImage && <img src={mapImage} alt="DnD map" />}
      <form onSubmit={handleMonsterSubmit}>
        <label>
          Enter a DnD monster description:
          <input
            type="text"
            value={monsterResponse}
            onChange={handleMonsterChange}
          />
        </label>
        <button type="submit">Generate Monster Image</button>
      </form>

      {monsterImage && <img src={monsterImage} alt="DnD monster" />}
    </div>
  );
}

export default DALLE2;
