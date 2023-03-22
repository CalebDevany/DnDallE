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

  const generateMonster = async () => {
    const response = await axios.get("https://api.openai.com/v1/completions", {
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
        Authorization: "Bearer <OPENAI_API_KEY>",
      },
    });

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
            Authorization: "Bearer <OPENAI_API_KEY>",
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
    <div class="monster-section">
      <main>
        <h1 class="title">Monster Generator</h1>
        <form onSubmit={handleSubmit}>
          <label class="form-label">
            Name:
            <input
              class="form-input"
              type="text"
              value={monsterName}
              onChange={(event) => setMonsterName(event.target.value)}
            />
          </label>
          <br />
          <label class="form-label">
            Type:
            <input
              class="form-input"
              type="text"
              value={monsterType}
              onChange={(event) => setMonsterType(event.target.value)}
            />
          </label>
          <br />
          <label class="form-label">
            Strength:
            <input
              class="form-input"
              type="number"
              name="strength"
              value={monsterStats.strength}
              onChange={handleStatChange}
            />
          </label>
          <br />
          <label class="form-label">
            Dexterity:
            <input
              class="form-input"
              type="number"
              name="dexterity"
              value={monsterStats.dexterity}
              onChange={handleStatChange}
            />
          </label>
          <br />
          <label class="form-label">
            Constitution:
            <input
              class="form-input"
              type="number"
              name="constitution"
              value={monsterStats.constitution}
              onChange={handleStatChange}
            />
          </label>
          <br />
          <label class="form-label">
            Intelligence:
            <input
              class="form-input"
              type="number"
              name="intelligence"
              value={monsterStats.intelligence}
              onChange={handleStatChange}
            />
          </label>
          <br />
          <label class="form-label">
            Wisdom:
            <input
              class="form-input"
              type="number"
              name="wisdom"
              value={monsterStats.wisdom}
              onChange={handleStatChange}
            />
          </label>
          <br />
          <label class="form-label">
            Charisma:
            <input
              class="form-input"
              type="number"
              name="charisma"
              value={monsterStats.charisma}
              onChange={handleStatChange}
            />
          </label>
          <br />
          <button class="generate-button" type="submit">
            Generate Monster
          </button>
        </form>
        {generatedMonster && (
          <div class="monster-section">
            <div class="monster-description">
              <h2>{generatedMonster.name}</h2>
              <p>{generatedMonster.type}</p>
              <ul>
                <li>Strength: {generatedMonster.stats.strength}</li>
                <li>Dexterity: {generatedMonster.stats.dexterity}</li>
                <li>Constitution: {generatedMonster.stats.constitution}</li>
                <li>Intelligence: {generatedMonster.stats.intelligence}</li>
                <li>Wisdom: {generatedMonster.stats.wisdom}</li>
                <li>Charisma: {generatedMonster.stats.charisma}</li>
              </ul>
            </div>
            <div class="monster-image">
              <img src={generatedMonster.image} alt={generatedMonster.name} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MonsterGenerator;
