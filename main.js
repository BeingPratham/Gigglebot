// const express = require('express');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());

// // Initialize Google Generative AI
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// // Configure the model
// const model = genAI.getGenerativeModel({
//     model: 'gemini-1.5-flash',
// });

// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: 'text/plain',
// };

// // AI Story Generator using Google Generative AI
// const generateStory = async (character, theme, age) => {
//     // const prompt = `Create a story for a ${age}-year-old. The main character is ${character} and the theme is ${theme}.`;
//     const prompt = `Imagine i am ${character} and i am describing my story to ${age} year old for this ${theme} theme and think of it as i am the main role.`;

//     try {
//         const result = await model.generateContent(prompt, generationConfig);
//         const response = await result.response;
//         const text = await response.text();
//         return text;
//     } catch (error) {
//         console.error('Error generating story:', error);
//         throw new Error('Failed to generate story');
//     }
// };

// // Routes
// app.post('/generate-story', async (req, res) => {
//     const { character, theme, age } = req.body;

//     if (!character || !theme || !age) {
//         return res.status(400).json({ error: 'Please provide character, theme, and age.' });
//     }

//     try {
//         const story = await generateStory(character, theme, age);
//         res.json({ story });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Configure the model
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

// AI Story Generator using Google Generative AI
const generateStory = async (characters, themes, age) => {
    const characterList = characters.join(', ');
    const themeList = themes.join(' and ');

    const prompt = `Create a story for a ${age}-year-old with the main characters being ${characterList} and the themes are ${themeList}. Make it engaging and suitable for a child.`;

    try {
        const result = await model.generateContent(prompt, generationConfig);
        const response = await result.response;
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error generating story:', error);
        throw new Error('Failed to generate story');
    }
};

// Routes
app.post('/generate-story', async (req, res) => {
    const { characters, themes, age } = req.body;

    if (!characters || !themes || !age || !Array.isArray(characters) || !Array.isArray(themes)) {
        return res.status(400).json({ error: 'Please provide valid characters, themes, and age.' });
    }

    try {
        const story = await generateStory(characters, themes, age);
        res.json({ story });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
