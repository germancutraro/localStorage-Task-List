const form = document.querySelector('#task-form'),
      taskList = document.querySelector('.collection'),
      clearBtn = document.querySelector('.clear-tasks'),
      filter = document.querySelector('#filter'),
      taskInput = document.querySelector('#task');

// Events
loadEventListeners();

// Load Tasks from lc
getTasks();

// Function - hoisted
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Form Submit Event
    form.addEventListener('submit', addTask);
    // Remove task event -> We take advantage of event delegation here
    taskList.addEventListener('click', removeTask);
    // Clear all tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Functions 

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null)
        tasks = [];
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.map(task => {
        // Create Li
        const li = document.createElement('li');
        li.setAttribute('class', 'collection-item');
        li.textContent = task;
        // Create new link element
        const link = document.createElement('a');
        link.setAttribute('class', 'delete-item secondary-content');
        link.innerHTML = '<i class="fa fa-remove">';
        li.appendChild(link);
        // Append LI element
        taskList.appendChild(li);
    });
}

function addTask(e) {
    // Prevent Submit Behavior
    e.preventDefault();
    // Verify if the task input is empty
    if (taskInput.value === '')
        return alert('You must add a task!');

    // Create Li
    const li = document.createElement('li');
    li.setAttribute('class', 'collection-item');
    li.textContent = taskInput.value;
    // Create new link element
    const link = document.createElement('a');
    link.setAttribute('class', 'delete-item secondary-content');
    link.innerHTML = '<i class="fa fa-remove">';
    li.appendChild(link);
    // Append LI element
    taskList.appendChild(li);
    // Store in localStorage function call
    storeTask(taskInput.value);
    // Clean input task 
    taskInput.value = '';
}

function removeTask(e) {
    let targetElement = e.target.parentElement;

    if (targetElement.classList.contains('delete-item'))
        if (confirm('Are you sure?')) {
            targetElement.parentElement.remove();
            removeTaskStored(e.target.parentElement.parentElement);
        }
}

function clearTasks(e) {
    e.preventDefault();
    // remove
    while (taskList.firstChild)
        taskList.removeChild(taskList.firstChild);
    // Remove all from localStorage
    localStorage.clear();
}

function filterTasks(e) {
    let filterText = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task => {
        let item = task.innerText.toLowerCase();
        // if ternary statement for filter task
        item.includes(filterText) ? task.style.display = 'block' : task.style.display = 'none';
    });
}

function storeTask(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null)
        tasks = [];
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskStored(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null)
        tasks = [];
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.map((task, i) => {
        taskItem.textContent === task ? tasks.splice(i, 1) : false;
    });
    // reload tasks after the delete
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
