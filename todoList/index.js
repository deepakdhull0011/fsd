document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    // Add task when button is clicked
    addBtn.addEventListener('click', addTask);

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        // Create new task
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        // Add to DOM
        createTaskElement(task);

        // Save to localStorage
        saveTasks();

        // Clear input
        taskInput.value = '';
        taskInput.focus();
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;                
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        if (task.completed) {
            taskSpan.classList.add('completed');
        }
        
        taskSpan.addEventListener('click', function() {
            this.classList.toggle('completed');
            saveTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(function(taskEl) {
            const taskSpan = taskEl.querySelector('span');
            tasks.push({
                id: parseInt(taskEl.dataset.id),
                text: taskSpan.textContent,
                completed: taskSpan.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task));
    }
});