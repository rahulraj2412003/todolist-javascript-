/* script.js */
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', addTask);

function updateTaskNumbers() {
  const listItems = taskList.querySelectorAll('li');
  listItems.forEach((li, index) => {
    const taskDiv = li.firstChild;
    taskDiv.textContent = `${index + 1}. ${taskDiv.textContent.replace(/^\d+\.\s*/, '')}`;
  });
}

function addTask() {
  const taskText = taskInput.value;
  const completionDate = dateInput.value;

  if (taskText && completionDate) {
    const li = document.createElement('li');

    li.innerHTML = `
      <div> ${taskText}</div>
      <div>Completion Date: ${completionDate}</div>
      <div><button>Edit</button><button>Delete</button></div>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    dateInput.value = '';
    updateTaskNumbers();

    const editButton = li.querySelector('button');
    const deleteButton = li.querySelector('button:last-child');
    const taskDiv = li.firstChild;
    const dateDiv = taskDiv.nextElementSibling;

    editButton.onclick = () => {
      const input = document.createElement('input');
      input.value = taskDiv.textContent.replace(/^\d+\.\s*/, '');
      li.replaceChild(input, taskDiv);
      input.focus();
      input.onblur = input.onkeydown = (e) => {
        if (e.type === 'blur' || e.key === 'Enter') {
          taskDiv.textContent = `${taskDiv.textContent.match(/^\d+\.\s*/)[0]}${input.value}`;
          li.replaceChild(taskDiv, input);
        }
      };
      const dateInputEdit = document.createElement('input');
      dateInputEdit.type = 'date';
      dateInputEdit.value = dateDiv.textContent.replace("Completion Date: ", "");
      li.replaceChild(dateInputEdit, dateDiv);
      dateInputEdit.onblur = () => {
        dateDiv.textContent = `Completion Date: ${dateInputEdit.value}`;
        li.replaceChild(dateDiv, dateInputEdit);
      };

    };

    deleteButton.onclick = () => {
      li.remove();
      updateTaskNumbers();
    };
  } else {
    alert("Please enter both task and completion date.");
  }
}