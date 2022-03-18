"use strict";

//Fechas del header
const numberDate = document.getElementById("numberDate");
const monthDate = document.getElementById("monthDate");
const yearDate = document.getElementById("yearDate");
const textDate = document.getElementById("textDate");

const setDate = () => {
  const date = new Date();
  numberDate.textContent = date.toLocaleString("es", { day: "numeric" });
  yearDate.textContent = date.toLocaleString("es", { year: "numeric" });
  monthDate.textContent = date.toLocaleString("es", { month: "short" });
  textDate.textContent = date.toLocaleString("es", { weekday: "long" });
};
setDate();

const taskForm = document.querySelector("form");
const myTaskList = document.querySelector("ul");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskObject = {
    content: event.target.elements.newTask.value,
    urgency: +event.target.elements.importance.value,
    toDone: false,
    taskDate: new Date().toLocaleString(),
  };

  addToList(taskObject);

  taskForm.reset();

  const tasksFromLocalStorage = getTasksFromLocalStorage();

  localStorage.setItem(
    "tasks",
    JSON.stringify([...tasksFromLocalStorage, taskObject])
  );
});

const addToList = (taskObject) => {
  const li = document.createElement("li");
  const article = document.createElement("article");
  const input = document.createElement("input");
  const taskP = document.createElement("p");
  const taskDateP = document.createElement("p");

  taskP.textContent = taskObject.content;
  if (taskObject.urgency) {
    taskP.classList.add("important");
  }
  input.type = "checkbox";
  taskDateP.textContent = taskObject.taskDate;

  myTaskList.append(li);
  li.append(article);
  article.append(input, taskP, taskDateP);
};

const getTasksFromLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];

  return tasksFromLocalStorage;
};

const generateTasksList = () => {
  const tasksFromLocalStorage = getTasksFromLocalStorage();

  for (const taskObject of tasksFromLocalStorage) {
    addToList(taskObject);
  }
};

generateTasksList();
