import React, { useState } from "react";
import axios from "axios";

function CharacterGenerator() {
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
  const [selectedModel, setSelectedModel] = useState("64");

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
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
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

  const generateImage = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "image-alpha-001",
          prompt: `Photorealistic portrait of DnD character ${characterRace} ${characterClass}`,
          num_images: 1,
          size: "512x512",
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
          },
        }
      )
      .then((response) => {
        setGeneratedImage(response.data.data[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStatChange = (event) => {
    const statName = event.target.name;
    const statValue = parseInt(event.target.value);
    const newStats = { ...characterStats, [statName]: statValue };
    setCharacterStats(newStats);
  };

  const handleSubmit = async (event) => {
    await event.preventDefault();
    await generateCharacter();
    await generateImage();
  };

  return (
    <div>
      <h1>Character Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={characterName}
            onChange={(event) => setCharacterName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Race:
          <input
            type="text"
            value={characterRace}
            onChange={(event) => setCharacterRace(event.target.value)}
          />
        </label>
        <br />
        <label>
          Class:
          <input
            type="text"
            value={characterClass}
            onChange={(event) => setCharacterClass(event.target.value)}
          />
        </label>
        <br />
        <label>
          Strength:
          <input
            type="number"
            name="strength"
            value={characterStats.strength}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label>
          Dexterity:
          <input
            type="number"
            name="dexterity"
            value={characterStats.dexterity}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label>
          Constitution:
          <input
            type="number"
            name="constitution"
            value={characterStats.constitution}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label>
          Intelligence:
          <input
            type="number"
            name="intelligence"
            value={characterStats.intelligence}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label>
          Wisdom:
          <input
            type="number"
            name="wisdom"
            value={characterStats.wisdom}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label>
          Charisma:
          <input
            type="number"
            name="charisma"
            value={characterStats.charisma}
            onChange={handleStatChange}
          />
        </label>
        <br />
        <label>
          Image size:
          <select
            value={selectedModel}
            onChange={(event) => setSelectedModel(event.target.value)}
          >
            <option value="256">256x256</option>
            <option value="512">512x512</option>
            <option value="1024">1024x1024</option>
          </select>
        </label>
        <br />
        <button type="submit">Generate</button>
      </form>
      {generatedCharacter && (
        <div>
          <h2>{generatedCharacter.name}</h2>
          <p>
            {generatedCharacter.race} {generatedCharacter.class}
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
      )}
      {generatedImage && (
        <div>
          <h2>Image</h2>
          <img src={generatedImage} alt={{generatedCharacter}} />
        </div>
      )}
    </div>
  );
}

export default CharacterGenerator;
