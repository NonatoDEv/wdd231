//arrays and objects
const nonatoDev = {
    name: "Abel J. Nonato Avalos",
    origin: "Ilo, Peru",
    residence: "Chincha Alta, Peru",
    profession: "Web Developer",
    interests: ["Coding", "Design", "Music", "Traveling", "Food", "Swimming on the beach"],
    description: "I am a Software Development student at BYU-Idaho. I have a beautiful family with my wife, Erika, and our daughter. Although I currently live in Chincha, I deeply identify with my hometown, Ilo. I am passionate about front-end development and creating impactful technology solutions. Currently, I work in the agro-export industry in Ica, assisting in the assembly of packaging for grape exports. We work with major global brands such as Vanguard, Walmart, and Costco."
};
const courses = [
    { subject: 'CSE', number: 110, title: 'Programming with Building Blocks', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, completed: false }
];
//functions to render content
//1. about me section
function renderAboutMe() {
    const aboutContainer = document.getElementById('about-content');
    if (aboutContainer) {
        aboutContainer.innerHTML = `
        <p>${nonatoDev.description}</p>
        <ul class="info-list">
                <li><strong>🏠 Current Residence:</strong> ${nonatoDev.residence}</li>
                <li><strong>📍 Hometown:</strong> ${nonatoDev.origin}</li>
                <li><strong>💻 Goal:</strong> ${nonatoDev.profession}</li>
                <li><strong>🎨 Interests:</strong> ${nonatoDev.interests.join(", ")}</li>
            </ul>
        `;
}}

renderAboutMe();
//2. course work section
//button event listeners for filtering courses
document.getElementById('btn-all').addEventListener('click', () => {
    renderCourses(courses);
});
document.getElementById('btn-cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(cseCourses);
});
document.getElementById('btn-wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(wddCourses);
});
const filterButtons = document.querySelectorAll('.btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
})
//function to render courses
const courseDisplay = document.getElementById('course-display');

function renderCourses(filteredCourses){
    courseDisplay.innerHTML = '';
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        if(course.completed){
            courseCard.classList.add('completed');
        }
        courseCard.innerHTML = `<h3>${course.subject} ${course.number}: ${course.title}</h3>`;
        courseDisplay.appendChild(courseCard);
    });
    const courseTotal = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = `${courseTotal}`;
}
renderCourses(courses);