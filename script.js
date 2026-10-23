
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks when the page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const tasks = getTasks();

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks(tasks);
    renderTasks();

    taskInput.value = "";
}

// Allow Enter key to add a task
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Get saved tasks
function getTasks() {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
}

// Save tasks in localStorage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    renderTasks();
}

// Display tasks on the webpage
function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Mark a task as completed or incomplete
function toggleTask(id) {
    const tasks = getTasks();

    const updatedTasks = tasks.map(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks(updatedTasks);
    renderTasks();
}

// Delete a task
function deleteTask(id) {
    const tasks = getTasks();

    const updatedTasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks(updatedTasks);
    renderTasks();
}

