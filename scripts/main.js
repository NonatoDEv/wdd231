import { nonatoDev, courses } from './data.js';

const aboutContent = document.querySelector('#about-content');
const courseDisplay = document.querySelector('#course-display');
const totalCreditsSpan = document.querySelector('#total-credits');

function renderAbout() {
    aboutContent.innerHTML = `
        <p>${nonatoDev.description}</p>
        <ul class="info-list">
            <li><strong>📍 Hometown:</strong> ${nonatoDev.origin}</li>
            <li><strong>🏠 Current Residence:</strong> ${nonatoDev.residence}</li>
            <li><strong>💻 Goal:</strong> ${nonatoDev.profession}</li>
            <li><strong>🎨 Interests:</strong> ${nonatoDev.interests.join(", ")}</li>
        </ul>
    `;
}
document.querySelector('#btn-all').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses);
});
document.querySelector('#btn-cse').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});
document.querySelector('#btn-wdd').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});
function setActiveButton(button) {
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}
function displayCourses(filteredCourses) {
    courseDisplay.innerHTML = "";
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        courseDisplay.appendChild(card);
    });

const total = filteredCourses.reduce((sum, course) => {
    if (course.completed) {
        return sum + course.credits;
    } else {
        return sum;
    }
}, 0)
totalCreditsSpan.textContent = total;
}
renderAbout();
displayCourses(courses);
