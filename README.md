# Chat bot for subject learning


This chatbot designed to assist students in learning various subjects by providing helpful resources, answering questions, and offering study tips.

## Features

- Friendly and supportive interactions
- Assistance with subjects like Mathematics, Science, Language Arts, Social Studies, and Foreign Languages
- Step-by-step explanations for homework questions
- Test preparation with practice quizzes, study guides, flashcards, and test-taking tips
- Recommendations for online learning platforms, books, and educational websites
- Study tips on time management, note-taking, mind mapping, and staying focused

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/sojashivam/Chat-bot-for-subject-learning.git
    cd Chat-bot-for-subject-learning

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your API key:
    ```plaintext
    GEMINI_API_KEY="Paste your API Key here"
    PORT=3000
    ```

## Usage

1. Start the server:
    ```sh
    node server.js
    ```

2. Open your web browser and navigate to `http://localhost:3000` to interact with the chatbot.

## API Endpoints

### `GET /`

Serves the main HTML page to interact with the chatbot.

### `GET /loader.gif`

Serves a loading animation for the chatbot interface.

### `POST /chat`

Handles incoming chat requests and returns responses from the chatbot.

#### Request Body
```json
{
  "userInput": "Your input message here"
}
