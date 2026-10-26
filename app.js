const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");

const createTaskElement = function (taskText) {
  const listItem = document.createElement("li");

  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");

  label.innerText = taskText;
  label.className = "task";

  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  todoList.appendChild(listItem);
  bindTaskInteractions(listItem);

  newTaskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditing = listItem.classList.contains("editMode");
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const toggleTaskStatus = function () {
  const listItem = this.parentNode;
  const destinationList = this.checked ? completedList : todoList;

  destinationList.appendChild(listItem);
};

addTaskButton.addEventListener("click", addTask);

const bindTaskInteractions = function (taskItem) {
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskStatus;
};

for (let i = 0; i < todoList.children.length; i++) {
  bindTaskInteractions(todoList.children[i]);
}

for (let i = 0; i < completedList.children.length; i++) {
  bindTaskInteractions(completedList.children[i]);
}
