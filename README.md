# DnD Character Generator

This is a web application built using React that generates DnD characters and dialogue using the ChatGPT API, and DnD character models and maps using the DALLE2 API.

## Installation

To run this application locally, you will need to have Node.js and npm installed on your system.

1. Clone this repository to your local machine.
2. Run npm install to install the project dependencies.
3. Create a .env file in the root directory of the project with the following environment variables:
    3(a). Optionally, you may also paste your API key in directly to the Authorization header.

    `OPENAI_API_KEY=<your ChatGPT API key>`

4. Run npm start to start the development server.
5. Open http://localhost:3000 in your web browser.

## Usage

On the home page of the application, you will see three forms: one for generating DnD characters, one for generating DnD monsters, and one for generating DnD characters models, monster models and maps.

## Character Generator

To generate a DnD character and dialogue:

1. Fill out the character description form with a description of your desired character.
2. Click the "Generate Character" button.
3. The application will generate a character image using the DALLE2 API and display it on the screen.

## Monster Generator

To generate a DnD character and dialogue:

1. Fill out the character description form with a description of your desired character.
2. Click the "Generate Character" button.
3. The application will generate a character image using the DALLE2 API and display it on the screen.

## Map Generator

To generate a DnD map:

1. Fill out the map description form with a description of your desired map.
2. Click the "Generate Map" button.
3. The application will generate a map image using the DALLE2 API and display it on the screen.

## License

This project is licensed under the MIT License. See the LICENSE file for details.