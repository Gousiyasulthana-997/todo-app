const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");

// Load tasks
window.onload = loadTasks;

// Add task
addBtn.onclick = function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    addTaskToDOM(taskText);
    saveTask(taskText);

    taskInput.value = "";
};

// Add task to UI
function addTaskToDOM(taskText) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = taskText;

    // Mark complete
    span.onclick = () => span.classList.toggle("completed");

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";

    deleteBtn.onclick = () => {
        li.remove();
        removeTask(taskText);
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Save task
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Remove task
function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all
clearBtn.onclick = function () {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
};