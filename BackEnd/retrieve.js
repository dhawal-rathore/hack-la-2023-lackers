const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

const API_URL = "https://canvas.ubc.ca";
const API_KEY = "11224~qDFB37QAxQMzANwXVU1cWElrpgDEjSXAYeoxLZL3Zx5xLEnLiRHmqvL3NNhZUbPK";

async function getCanvasData(url, params = {}) {
    params.per_page = 100;  // Add this line
    const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${API_KEY}` },
        params: params
    });
    return response.data;
}

async function getActiveCourses() {
    const courses = await getCanvasData(`${API_URL}/api/v1/courses`, { enrollment_status: 'active' });
    return courses.filter(course => course.name);
}

async function getAssignments(courseId) {
    return await getCanvasData(`${API_URL}/api/v1/courses/${courseId}/assignments`);
}

async function getAnnouncements(contextCode) {
    return await getCanvasData(`${API_URL}/api/v1/announcements`, { context_codes: [contextCode] });
}
async function retrieve() {
    const courses = await getActiveCourses();
    let output = '';  // Initialize the output string

    for (const course of courses) {
        output += `Course Name: ${course.name}\n\nAssignments:\n`;

        const assignments = await getAssignments(course.id);
        if (assignments.length === 0) {
            output += "No assignments\n\n";
            continue;
        }

        for (const assignment of assignments) {
            const dueAt = assignment.due_at ? moment(assignment.due_at).toDate() : null;
            const now = new Date();
            if (!dueAt) {
                output += `${assignment.name} has no due date with max points: ${assignment.points_possible}\n`;
                continue;
            }
            if (dueAt > now) {
                output += `${assignment.name} is due on ${dueAt} with max points: ${assignment.points_possible}\n`;
            } else {
                output += `${assignment.name} was due on ${dueAt} with max points: ${assignment.points_possible}\n`;
            }
        }

        output += "\nAnnouncements:\n";

        const announcements = await getAnnouncements(`course_${course.id}`);
        if (announcements.length === 0) {
            output += "No announcements\n\n";
            continue;
        }

        for (const announcement of announcements) {
            const $ = cheerio.load(announcement.message);
            const message = $('p').map((i, el) => $(el).text()).get().join(' ');
            output += `${announcement.title}:\n${message}\n`;
        }

        output += '\n';
    }

    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    output += `Today's date is: ${dateString}\n`;

    console.log(output);  // Print the output string
    return output;
}

retrieve().catch(console.error);
module.exports = retrieve;