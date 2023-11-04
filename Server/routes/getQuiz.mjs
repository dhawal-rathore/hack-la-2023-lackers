var fetch = require('node-fetch');
require('dotenv').config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const API_URL = process.env.CANVAS_API_DOMAIN;
const COURSE_ID = 138358;

async function getQuizIds() {
    try {
        // API request to get quizzes in the course
        const response = await fetch(`${API_URL}/courses/${COURSE_ID}/quizzes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });

        // Parse response as JSON
        const quizzes = await response.json();

        // Extract quiz IDs from the response
        const quizIds = quizzes.map(quiz => quiz.id);
        console.log(`Quiz IDs in course ${COURSE_ID}: ${quizIds}`);

        return quizIds;
    } catch (error) {
        console.error(error);
    }
}

// Call the function to get quiz IDs
getQuizIds().then(quizIds => {
    // You can perform further operations with quizIds here if needed
    console.log('Quiz IDs obtained:', quizIds);
});
