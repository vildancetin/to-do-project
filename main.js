import "./style.css";
import "./node_modules/bootstrap/dist/js/bootstrap.bundle";

const toDoForm = document.querySelector("#toDoForm");
const inputForm = document.getElementById("form2");
const buttons = document.getElementById("ex1");
const tabContent = document.querySelector(".tab-content ul");


const blockquoteP= document.querySelector(".blockquote p")
const blockquoteCite= document.querySelector(".blockquote cite")
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const createToDo = () => {
  const inputToDo = document.getElementById("form2").value.trim();

  if (inputToDo) {
    const toDoObject = {
      id: new Date().getTime(),
      task: inputToDo,
      checked: false,
    };
    tasks.push(toDoObject);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createToDo();
  tabContent.textContent=""
  showToDo(tasks)
  toDoForm.reset();
});
buttons.addEventListener("click", (e) => {
  tabContent.textContent = "";
  let filteredTodos;
  if (e.target.id === "ex1-tab-1") {
    removeClass(e)
    filteredTodos = tasks;
    showToDo(filteredTodos);
  } else if (e.target.id === "ex1-tab-2") {
    removeClass(e)
    filteredTodos = tasks.filter((todo) => !todo.checked);
    showToDo(filteredTodos);
  } else if (e.target.id === "ex1-tab-3") {
    removeClass(e)
    filteredTodos = tasks.filter((todo) => todo.checked === true);
    showToDo(filteredTodos);
  }
});

function removeClass(e) { 
  document.querySelectorAll('a').forEach(function(link) {
    link.classList.remove("active","bg-info");
  });
  e.target.classList.add("active","bg-info")
 }
function showToDo(todos) {
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "border-0",
      "mb-2",
      "rounded"
    );
    li.style.backgroundColor = "#f4f6f7";
    li.id = todo.id;

    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.className = "form-check-input me-2 check";
    inputCheck.style.backgroundColor="#FF5C7F"
    inputCheck.id = todo.id;
    inputCheck.checked = todo.checked;


    inputCheck.addEventListener("change", () => {
      todo.checked = inputCheck.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      tabContent.innerHTML=""
      showToDo(tasks)
    });

    const label = document.createElement("label");
    label.textContent = todo.task;

    li.append(inputCheck, label);
    
    if (todo.checked) {
      li.classList.add("completed");
    }
    tabContent.append(li);
  });
}

window.addEventListener("load",()=>{
  showToDo(tasks)
  getApi()
})

const getApi=async ()=>{
  try{
      const res = await fetch("https://api.quotable.io/quotes/random")
      if(!res.ok){
        throw new Error(`HTTP error! Status:${res.status}`)
      }
      const data = await res.json()
      const {author,content} = data[0]
      blockquoteP.textContent=content
      blockquoteCite.textContent=author
  }catch(error){
    console.log(`Error : `, error.message)
  }

}