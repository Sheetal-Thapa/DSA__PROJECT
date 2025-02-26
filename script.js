const syllabus = {
    "DSA": ["Sorting Algorithms", "Searching Algorithms", "Recursion"],
    "Microprocessor": ["8085 Architecture", "Instruction Set", "Timing Diagrams"],
    "Instrumentation": ["Sensors", "Data Acquisition", "Signal Conditioning"],
    "Discrete structure": ["Logic, Induction and Reasoning", "Finite State Automata", "Recurrence Relation", "Graph Theory"],
    "Numerical Method":["Errors and approximation","Solution of non linear Equations","Interpolation"]
};

const sortedSubjects = Object.keys(syllabus).sort();
const subjectSelect = document.getElementById("subject");

sortedSubjects.forEach(subject => {
    let option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
});

function loadSyllabus() {
    const subject = document.getElementById("subject").value;
    const chapterSelect = document.getElementById("chapter");
    chapterSelect.innerHTML = "";

    if (syllabus[subject]) {
        let chapters = syllabus[subject].sort();
        chapters.forEach(chapter => {
            let option = document.createElement("option");
            option.value = chapter;
            option.textContent = chapter;
            chapterSelect.appendChild(option);
        });
    }
}

let totalStudyTime = 0;
let tasksCompleted = 0;
let tasks = [];

function updateAnalytics() {
    document.getElementById("totalTime").textContent = `Total Study Time: ${totalStudyTime} minutes`;
    document.getElementById("totalTasks").textContent = `Total Tasks Completed: ${tasksCompleted}`;
}

function addTask() {
    const subject = document.getElementById("subject").value;
    const chapter = document.getElementById("chapter").value;
    const time = parseInt(document.getElementById("time").value);
    const priority = document.getElementById("priority").value;
    const taskList = document.getElementById("taskList");

    if (!subject || !chapter || !time) {
        alert("Please select all fields!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = `${subject} - ${chapter} (${time} mins) - Priority: ${priority}`;
    li.classList.add(`task-${priority.toLowerCase()}`);

    li.addEventListener("click", function () {
        if (!li.classList.contains("completed")) {
            li.classList.add("completed");
            tasksCompleted++;
            updateAnalytics();
        }
    });

    taskList.appendChild(li);

    tasks.push({ subject, chapter, time, priority, element: li });
    totalStudyTime += time;
    updateAnalytics();
}

function searchTasks() {
    const query = document.getElementById("search").value.toLowerCase();
    const filteredTasks = tasks.filter(task => {
        return task.subject.toLowerCase().includes(query) ||
            task.chapter.toLowerCase().includes(query) ||
            task.priority.toLowerCase().includes(query);
    });

    updateTaskList(filteredTasks);
}

function sortTasks() {
    const sortBy = document.getElementById("sort").value;
    let sortedTasks = [...tasks];

    if (sortBy === "priority") {
        sortedTasks.sort((a, b) => {
            const priorityOrder = ["High", "Medium", "Low"];
            return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        });
    } else if (sortBy === "time") {
        sortedTasks.sort((a, b) => a.time - b.time);
    }

    updateTaskList(sortedTasks);
}

function updateTaskList(taskArray) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";  
    taskArray.forEach(task => {
        taskList.appendChild(task.element);  
    });
}
