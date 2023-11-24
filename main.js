import "./style.css";
import "./node_modules/bootstrap/dist/js/bootstrap.bundle";

const toDoForm = document.querySelector("#toDoForm");
const inputForm = document.getElementById("form2");
const toDoArr = [];
const ex1Ul = document.getElementById("ex1");
const tabContent = document.querySelector(".tab-content ul");

toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const toDoObject = {
    id: new Date().getMilliseconds(),
    task: inputForm.value,
    state: false,
  };
  toDoArr.push(toDoObject);
  localStorage.setItem("tasks", JSON.stringify(toDoArr));
  console.log(inputForm.value);
  toDoForm.reset();
});

ex1Ul.addEventListener("click", (e) => {
  console.log(e.target.id);
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (e.target.id === "ex1-tab-1") {
    tasks.forEach((t) => {
      tabContent.innerHTML += `<li class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
    style="background-color: #f4f6f7;">
    <input class="form-check-input me-2" type="checkbox" value="" aria-label="..."  />${t.task}
    
  </li>`;
    });
  }
});
