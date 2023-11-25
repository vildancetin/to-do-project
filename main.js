import "./style.css";
import "./node_modules/bootstrap/dist/js/bootstrap.bundle";


const toDoForm = document.querySelector("#toDoForm");
const inputForm = document.getElementById("form2");
const buttons = document.getElementById("ex1");
const tabContent = document.querySelector(".tab-content ul");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const createToDo = ()=>{
  const inputToDo = document.getElementById("form2").value.trim();

  if(inputToDo){
    const toDoObject = {
      id: new Date().getTime(),
      task: inputToDo,
      checked: false,
    };
    tasks.push(toDoObject);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
toDoForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  createToDo()
  toDoForm.reset()
})
buttons.addEventListener("click",(e)=>{
  tabContent.textContent=""
  let filteredTodos
  if(e.target.id==="ex1-tab-1"){
    filteredTodos=tasks
    showToDo(filteredTodos)
    const checkbox = document.querySelectorAll(".check")
    checkbox.forEach(check=>{
      check.addEventListener("change",(e)=>{
     check.checked= e.target.checked
    })})
  }else if(e.target.id==="ex1-tab-2"){
    filteredTodos=tasks.filter(todo=>!todo.checked)
    showToDo(filteredTodos)
  }else if(e.target.id==="ex1-tab-3"){
    filteredTodos=tasks.filter(todo=>todo.checked===true)
    showToDo(filteredTodos)
  }
})

function showToDo(todos){
todos.forEach(todo => {
  const li = document.createElement("li")
  li.classList.add("list-group-item", "d-flex", "align-items-center", "border-0", "mb-2", "rounded")
  li.style.backgroundColor="#f4f6f7"
  li.id=todo.id

  const inputCheck= document.createElement("input")
  inputCheck.type="checkbox"
  inputCheck.className="form-check-input me-2 check"
  inputCheck.id=todo.id
  inputCheck.checked=todo.checked

  const label= document.createElement("label")
  label.textContent=todo.task

  li.append(inputCheck,label)
  tabContent.append(li)
});
} 

