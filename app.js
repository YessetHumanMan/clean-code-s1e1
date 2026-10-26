//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById("new-task"); //Add a new task.
const addTaskButton = document.getElementById("add-task"); //first button
const todoList = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedList = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const createTaskElement = function (taskText) {
  const listItem = document.createElement("li");

  //input (checkbox)
  const checkbox = document.createElement("input"); //checkbx
  //label
  const label = document.createElement("label"); //label
  //input (text)
  const editInput = document.createElement("input"); //text
  //button.edit
  const editButton = document.createElement("button"); //edit button

  //button.delete
  const deleteButton = document.createElement("button"); //delete button
  const deleteIcon = document.createElement("img"); //delete button image

  label.innerText = taskText;
  label.className = "task";

  //Each elements, needs appending
  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  //and appending.
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  //Append listItem to todoList
  todoList.appendChild(listItem);
  bindTaskInteractions(listItem);

  newTaskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditing = listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  //Remove the parent list item from the ul.
  taskList.removeChild(listItem);
};

//Move task to the list that matches its checkbox state.
const toggleTaskStatus = function () {
  const listItem = this.parentNode;
  const destinationList = this.checked ? completedList : todoList;

  destinationList.appendChild(listItem);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.addEventListener("click", addTask);

const bindTaskInteractions = function (taskItem) {
  //select ListItems children
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind task status change to the checkbox.
  checkbox.onchange = toggleTaskStatus;
};

//cycle over todoList ul list items
//for each list item
for (let i = 0; i < todoList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskInteractions(todoList.children[i]);
}

//cycle over completedList ul list items
for (let i = 0; i < completedList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskInteractions(completedList.children[i]);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
