"use strict";

//Actual Date
const numberDate = document.getElementById("numberDate");
const monthDate = document.getElementById("monthDate");
const yearDate = document.getElementById("yearDate");
const weekDate = document.getElementById("weekDate");

const currentDate = document.getElementById("currentDate");

const setDate = () => {
  const date = new Date();
  numberDate.textContent = date.toLocaleString("es", { day: "numeric" });
  yearDate.textContent = date.toLocaleString("es", { year: "numeric" });
  monthDate.textContent = date.toLocaleString("es", { month: "short" });
  weekDate.textContent = date.toLocaleString("es", { weekday: "long" });
};
setDate();
console.log("tuma");
