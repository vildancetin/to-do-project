import "./style.css";
import "./node_modules/bootstrap/dist/js/bootstrap.bundle";

// ? declare variables
const toDoForm = document.querySelector("#toDoForm");
const buttons = document.getElementById("ex1");
const tabContent = document.querySelector(".tab-content ul");


const blockquoteP= document.querySelector(".blockquote p")
const blockquoteCite= document.querySelector(".blockquote cite")

// ? get data from local storage if data doesn't exist it create empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ? create data fonktion and push to local storage with object
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

// ? when form submittied , it will craete todo and show to dom 
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createToDo();
  tabContent.textContent=""
  showToDo(tasks)
  toDoForm.reset();
});

// ? when click buttons , it compare id and remove class according to that from a links.And again show to dom according to todo completed or not completed


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
    createDeleteBtn()
  }
});

// ? and last button create delete button to remove completed todos

function createDeleteBtn(){
  const btn = document.createElement("button")
  btn.classList.add("btn","deleteBtn")
  btn.textContent="Delete Completed"
  tabContent.append(btn)

  btn.addEventListener("click",()=>{
    const confirmUser = confirm("Do you want to delete all completed?")
    if(confirmUser){
      tasks=tasks.filter(todo=>!todo.checked)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    tabContent.textContent=""
    }
    
  })
}
// ? this function add active link a class and remove the others
function removeClass(e) { 
  document.querySelectorAll('a').forEach(function(link) {
    link.classList.remove("active","bg-info");
  });
  e.target.classList.add("active","bg-info")
 }

//  ? it create function to write to dom and add change event to checkboxes. it takes a station about completed.
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

// ? when page loaded it runs
window.addEventListener("load",()=>{
  showToDo(tasks)
  getApi()
})

// ? it send a request to api to get random quotes and shows to user
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