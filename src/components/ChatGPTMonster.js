import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function MonsterGenerator() {
  const [generatedMonster, setGeneratedMonster] = useState(null);
  const [monsterName, setMonsterName] = useState("");
  const [monsterType, setMonsterType] = useState("");
  const [monsterStats, setMonsterStats] = useState({
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  });
  const [generatedImage, setGeneratedImage] = useState(null);

  const generateMonster= async () => {
    const response = await axios.get(
      "https://api.openai.com/v1/completions",
      {
        params: {
          model: "text-davinci-003",
          prompt: "Generate a Dungeons and Dragons monster named ",
          max_tokens: 1024,
          temperature: 0.7,
          n: 1,
          stop: "\n\n",
        },
        headers: {
          "Content-Type": "application/json",
        Authorization:
          "Bearer {API-KEY}",
      },
      }
    );

    const { choices } = response.data;
    const { text } = choices[0];
    const monsterData = JSON.parse(text.trim());
    setGeneratedMonster(monsterData);
    setMonsterName(monsterData.name);
    setMonsterType(monsterData.type);
    setMonsterStats(monsterData.stats);
  };

  const generateImage = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "image-alpha-001",
          prompt: `Photorealistic image of DnD monster ${monsterName}`,
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
      );

      const imageUrl = response.data.data[0].url;
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatChange = (event) => {
    const statName = event.target.name;
    const statValue = parseInt(event.target.value);
    const newStats = { ...monsterStats, [statName]: statValue };
    setMonsterStats(newStats);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await generateMonster();
    await generateImage();
  };

  return (
    <div className="monster-generator-container">
      <h1 className="title">Monster Generator</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            value={monsterName}
            onChange={(event) => setMonsterName(event.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          Type:
          <input
            className="form-input"
            type="text"
            value={monsterType}
            onChange={(event) => setMonsterType(event.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          Strength:
          <input
            className="form-input"
            type="number"
            name="strength"
            value={monsterStats.strength}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label className="form-label">
          Dexterity:
          <input
            className="form-input"
            type="number"
            name="dexterity"
            value={monsterStats.dexterity}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label className="form-label">
          Constitution:
          <input
            className="form-input"
            type="number"
            name="constitution"
            value={monsterStats.constitution}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label className="form-label">
          Intelligence:
          <input
            className="form-input"
            type="number"
            name="intelligence"
            value={monsterStats.intelligence}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label className="form-label">
          Wisdom:
          <input
            className="form-input"
            type="number"
            name="wisdom"
            value={monsterStats.wisdom}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label className="form-label">
          Charisma:
          <input
            className="form-input"
            type="number"
            name="charisma"
            value={monsterStats.charisma}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <button className="generate-button" type="submit">
          Generate Monster
        </button>
      </form>
      {generatedMonster && (
        <div className="monster-result-container">
          <h2 className="monster-name">{generatedMonster.name}</h2>
          <p className="monster-type">Type: {generatedMonster.type}</p>
          <div className="monster-stats-container">
            <p className="monster-stat">
              Strength: {generatedMonster.stats.strength}
            </p>
            <p className="monster-stat">
              Dexterity: {generatedMonster.stats.dexterity}
            </p>
            <p className="monster-stat">
              Constitution: {generatedMonster.stats.constitution}
            </p>
            <p className="monster-stat">
              Intelligence: {generatedMonster.stats.intelligence}
            </p>
            <p className="monster-stat">
              Wisdom: {generatedMonster.stats.wisdom}
            </p>
            <p className="monster-stat">
              Charisma: {generatedMonster.stats.charisma}
            </p>
          </div>
        </div>
      )}
      {generatedImage && (
        <div className="monster-image-container">
          <img src={generatedImage} alt="Generated Monster" />
        </div>
      )}
    </div>
  );
}

export default MonsterGenerator;
