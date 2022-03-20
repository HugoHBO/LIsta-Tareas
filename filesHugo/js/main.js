"use strict";

// tremos Fechas del header
const numberDate = document.getElementById("numberDate");
const monthDate = document.getElementById("monthDate");
const yearDate = document.getElementById("yearDate");
const textDate = document.getElementById("textDate");

// valores de las fechas del header
const setDate = () => {
  const date = new Date();
  numberDate.textContent = date.toLocaleString("es", { day: "numeric" });
  yearDate.textContent = date.toLocaleString("es", { year: "numeric" });
  monthDate.textContent = date.toLocaleString("es", { month: "short" });
  textDate.textContent = date.toLocaleString("es", { weekday: "long" });
};
setDate();

// traemos el Form y la Ul
const taskForm = document.querySelector("form");
const taskList = document.querySelector("ul");

// evento para el el checkbox
taskList.addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    e.target.nextElementSibling.classList.toggle("done");
  }
  const target = e.target.nextElementSibling.textContent;
  const jeje = getTasksFromLocalStorage();
  const localStorageActual = jeje.map((tasks) => {
    //console.log(tasks.done);
    if (target === tasks.content) {
      tasks.done = true;
    }
    return tasks;
  });
  localStorage.setItem("tasks", JSON.stringify(localStorageActual));
});

// añado el listenear
taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // cancela acción Defaults
  const taskObject = {
    // valores de las tareas
    content: event.target.elements.newTask.value,
    urgency: +event.target.elements.importance.value,
    done: false,
    taskDate: new Date().toLocaleString().split(",")[0],
  };
  if (!taskObject.content) return; // no permite tareas sin contenido.
  addToList(taskObject); // llama a la función y crea el nuevo elemento en la ul
  taskForm.reset(); // reset al form
  // actualizamos el localStorage
  const tasksFromLocalStorage = getTasksFromLocalStorage();
  localStorage.setItem(
    "tasks",
    JSON.stringify([...tasksFromLocalStorage, taskObject])
  );
});

// Creador de nuevas tareas
const addToList = (taskObject) => {
  if (!taskObject.content) return; // no permite tareas sin contenido.
  // elementos de la nueva tarea
  const li = document.createElement("li");
  const article = document.createElement("article");
  const input = document.createElement("input");
  const taskP = document.createElement("p");
  const taskDateP = document.createElement("p");
  // valor del imput
  taskP.textContent = taskObject.content;
  // se crea el checkbox para marcar la tarea
  input.type = "checkbox";
  // se añade la fecha
  taskDateP.textContent = taskObject.taskDate;
  // si urgency es true, se agrega la clase "importante"
  if (taskObject.urgency) {
    taskP.classList.add("important");
  }
  // se ordena todo
  taskList.append(li);
  li.append(article);
  article.append(input, taskP, taskDateP);
}; // final de creador de nuevas tareas

const getTasksFromLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasksFromLocalStorage;
};
//console.log(getTasksFromLocalStorage());

const generateTasksList = () => {
  const tasksFromLocalStorage = getTasksFromLocalStorage();
  for (const taskObject of tasksFromLocalStorage) {
    addToList(taskObject);
  }
};

generateTasksList();
