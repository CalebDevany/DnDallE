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
    const response = await axios.get("https://api.openai.com/v1/completions", {
      params: {
        model: "text-davinci-003",
        prompt: "Generate a Dungeons and Dragons character named ",
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
    const newStats = { ...characterStats, [statName]: statValue };
    setCharacterStats(newStats);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await generateCharacter();
    await generateImage();
  };

  return (
    <div class="character-section">
      <main>
        <h1>Character Generator</h1>
        <form onSubmit={handleSubmit}>
          <label class="form-label">
            Name:
            <input
              class="form-input"
              type="text"
              value={characterName}
              onChange={(event) => setCharacterName(event.target.value)}
            />
          </label>
          <br />
          <label class="form-label">
            Race:
            <input
              class="form-input"
              type="text"
              value={characterRace}
              onChange={(event) => setCharacterRace(event.target.value)}
            />
          </label>
          <br />
          <label class="form-label">
            Class:
            <input
              class="form-input"
              type="text"
              value={characterClass}
              onChange={(event) => setCharacterClass(event.target.value)}
            />
          </label>
          <br />
          <label class="form-label">
            Strength:
            <input
              class="form-input"
              type="number"
              name="strength"
              value={characterStats.strength}
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
              value={characterStats.dexterity}
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
              value={characterStats.constitution}
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
              value={characterStats.intelligence}
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
              value={characterStats.wisdom}
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
              value={characterStats.charisma}
              onChange={handleStatChange}
            />
          </label>
          <br />
          <button class="generate-button" type="submit">
            Generate Character
          </button>
        </form>
        {generatedCharacter && (
          <div class="character-section">
            <div class="character-description">
              <h2>{generatedCharacter.name}</h2>
              <p>
                {generatedCharacter.race}, {generatedCharacter.class}
              </p>
              <ul>
                <li>Strength: {generatedCharacter.stats.strength}</li>
                <li>Dexterity: {generatedCharacter.stats.dexterity}</li>
                <li>Constitution: {generatedCharacter.stats.constitution}</li>
                <li>Intelligence: {generatedCharacter.stats.intelligence}</li>
                <li>Wisdom: {generatedCharacter.stats.wisdom}</li>
                <li>Charisma: {generatedCharacter.stats.charisma}</li>
              </ul>
            </div>
            <div class="character-image">
              <img
                src={generatedCharacter.image}
                alt={generatedCharacter.name}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ChatGPTCharacter;
