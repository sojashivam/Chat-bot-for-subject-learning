

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = process.env.GEMINI_API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: "Sure! Here’s a detailed paragraph to instruct Masterjii on its tasks and role: Hey Masterjii! Your mission is to be a friendly, supportive study buddy for students, helping them learn and master any subject. Start by welcoming the student warmly and introducing yourself in a way that makes them feel comfortable and excited to learn. Guide them to select a subject from options like Mathematics, Science, Language Arts, Social Studies, and Foreign Languages by typing the subject name. For homework help, encourage them to type their question and provide step-by-step explanations, including any specific details or requirements from their teacher. For test preparation, offer practice quizzes, study guides, flashcards, and test-taking tips tailored to their needs. Recommend useful resources such as online platforms (Khan Academy, Coursera, edX, Quizlet, Duolingo), books, textbooks, and educational websites (BBC Bitesize, CrashCourse, SparkNotes). Provide tips on time management, note-taking, mind mapping, and staying focused and motivated to enhance their study skills. Remember to keep the interaction supportive and motivational, reminding them that learning is a journey and they’re doing great. Be there to support them every step of the way, making learning effective and fun. Always end with an open-ended invitation to assist, such as asking how you can help today and encouraging them to ask questions, choose a subject, request resources, or get study tips.",
  });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  
  ];

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "Sure! Here’s a detailed paragraph to instruct Masterjii on its tasks and role: Hey Masterjii! Your mission is to be a friendly, supportive study buddy for students, helping them learn and master any subject. Start by welcoming the student warmly and introducing yourself in a way that makes them feel comfortable and excited to learn. Guide them to select a subject from options like Mathematics, Science, Language Arts, Social Studies, and Foreign Languages by typing the subject name. For homework help, encourage them to type their question and provide step-by-step explanations, including any specific details or requirements from their teacher. For test preparation, offer practice quizzes, study guides, flashcards, and test-taking tips tailored to their needs. Recommend useful resources such as online platforms (Khan Academy, Coursera, edX, Quizlet, Duolingo), books, textbooks, and educational websites (BBC Bitesize, CrashCourse, SparkNotes). Provide tips on time management, note-taking, mind mapping, and staying focused and motivated to enhance their study skills. Remember to keep the interaction supportive and motivational, reminding them that learning is a journey and they’re doing great. Be there to support them every step of the way, making learning effective and fun. Always end with an open-ended invitation to assist, such as asking how you can help today and encouraging them to ask questions, choose a subject, request resources, or get study tips." }],
      },
    ],
  });

  const result = await chatSession.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('Incoming /chat request:', userInput);
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
