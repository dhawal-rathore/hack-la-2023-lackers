const { OpenAI } = require("openai");
const express = require("express");
require("dotenv").config();
const retrieve = require('./retrieve.js');
var cors = require('cors');

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const app = express();
app.use(cors({
    origin: "http://localhost3001",
    methods:"GET",
}));

const giveAnswer = async (prompt, context) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: context },
            {role: "user", content: prompt},
            {role: "assistant", content: "Hello! Your next assignment (Assignment name) is due at and is worth x points. Your most recent assignement was the (Assignment name) due at. The recent announcements are: (summaarised announcements)."},
        ],
            model: "gpt-4", //gpt-3.5-turbo
        });
        return completion.choices[0];  // Return the completion
    } catch (error) {
        console.error("ERROR HAS HAPPEN");
    }
};

app.get('/answer', async (req, res) => {
    const prompt = "With the context given to you above, " +req.query.prompt;  // Get the prompt parameter from the request
    const context = await retrieve();  // Get the context
    const answer = await giveAnswer(prompt, context);  // Get the answer
    res.json(answer);  // Send the answer as a JSON response
    console.log("ANSWER WAS SENT");
});

app.listen(2000);

