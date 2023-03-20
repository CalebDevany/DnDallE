import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function ChatGPTCharacter() {
  const [generatedCharacter, setGeneratedCharacter] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterStats, setCharacterStats] = useState({
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  });
  const [generatedImage, setGeneratedImage] = useState(null);

  const generateCharacter = async () => {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      {
        params: {
          prompt: "Generate a Dungeons and Dragons character named ",
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
    const characterData = JSON.parse(text.trim());
    setGeneratedCharacter(characterData);
    setCharacterName(characterData.name);
    setCharacterRace(characterData.race);
    setCharacterClass(characterData.class);
    setCharacterStats(characterData.stats);
  };

  const generateImage = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "image-alpha-001",
          prompt: `Photorealistic portrait of DnD character ${characterRace} ${characterClass}`,
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
    const newStats = { ...characterStats, [statName]: statValue };
    setCharacterStats(newStats);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await generateCharacter();
    await generateImage();
  };

  return (
    <div className="character-generator-container">
      <h1 className="title">Character Generator</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            value={characterName}
            onChange={(event) => setCharacterName(event.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          Race:
          <input
            className="form-input"
            type="text"
            value={characterRace}
            onChange={(event) => setCharacterRace(event.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          Class:
          <input
            className="form-input"
            type="text"
            value={characterClass}
            onChange={(event) => setCharacterClass(event.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          Strength:
          <input
            className="form-input"
            type="number"
            name="strength"
            value={characterStats.strength}
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
            value={characterStats.dexterity}
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
            value={characterStats.constitution}
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
            value={characterStats.intelligence}
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
            value={characterStats.wisdom}
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
            value={characterStats.charisma}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <button className="generate-button" type="submit">
          Generate Character
        </button>
      </form>
      {generatedCharacter && (
        <div className="generated-character-container">
          <h2 className="generated-character-name">
            {generatedCharacter.name}
          </h2>
          <p className="generated-character-race-class">
            {generatedCharacter.race} {generatedCharacter.class}
          </p>
          <p className="generated-character-stats">
            Strength: {generatedCharacter.stats.strength}, Dexterity:{" "}
            {generatedCharacter.stats.dexterity}, Constitution:{" "}
            {generatedCharacter.stats.constitution}, Intelligence:{" "}
            {generatedCharacter.stats.intelligence}, Wisdom:{" "}
            {generatedCharacter.stats.wisdom}, Charisma:{" "}
            {generatedCharacter.stats.charisma}
          </p>
          {generatedImage && (
            <img
              className="generated-image"
              src={generatedImage}
              alt={`${characterRace} ${characterClass}`}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ChatGPTCharacter;
