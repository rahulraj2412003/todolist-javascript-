const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', addTask);

function updateTaskNumbers() {
    taskList.querySelectorAll('li').forEach((li, index) => {
        li.querySelector('.task-text').textContent = `${index + 1}. ${li.dataset.text}`;
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    const completionDate = dateInput.value;

    if (!taskText || !completionDate) return alert("Enter both task and date.");

    const li = document.createElement('li');
    li.dataset.text = taskText;
    li.innerHTML = `
        <div class="task-text">${taskText}</div>
        <div class="date-text">Completion Date: ${completionDate}</div>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
    taskInput.value = dateInput.value = '';
    updateTaskNumbers();

    li.querySelector('.edit-btn').onclick = () => editTask(li);
    li.querySelector('.delete-btn').onclick = () => confirmDelete(li);
}

function editTask(li) {
    const taskDiv = li.querySelector('.task-text');
    let dateDiv = li.querySelector('.date-text');

    const taskInputEdit = document.createElement('input');
    taskInputEdit.value = li.dataset.text;
    taskDiv.replaceWith(taskInputEdit);
    taskInputEdit.focus();

    const dateInputEdit = document.createElement('input');
    dateInputEdit.type = 'date';
    dateInputEdit.value = dateDiv.textContent.split(": ")[1];
    dateDiv.replaceWith(dateInputEdit);

    taskInputEdit.onblur = () => {
        li.dataset.text = taskInputEdit.value.trim();
        taskDiv.textContent = li.dataset.text;
        taskInputEdit.replaceWith(taskDiv);
        updateTaskNumbers();
    };

    dateInputEdit.onblur = () => {
        dateDiv.textContent = `Completion Date: ${dateInputEdit.value}`;
        dateInputEdit.replaceWith(dateDiv);
    }
}

function confirmDelete(li) {
    const confirmButton = document.createElement('button');
    confirmButton.textContent = "OK";
    li.appendChild(confirmButton);

    confirmButton.onclick = () => {
        li.remove();
        updateTaskNumbers();
    };
}
