# to-do-project
### Starter
I initially created a Vite project using the command```npm create vite@latest```.
This project allows users to add new tasks and mark them as completed. Additionally, each time the page loads, it retrieves random quotes from an API.
### Input and Save Data
First, the user enters a task and clicks the button to add it to the task list. 
The application saves this information in local storage, ensuring that data is retained even when the user closes the window.

### Tasks list
- In the task list section, data is fetched from local storage and displayed to the user. 
- Each task is presented with a checkbox, allowing the user to mark it as complete or incomplete. 
- Clicking the checkbox label triggers a visual indication with a line-through, accompanied by a change in the completion status.

Event listeners are employed to manage checkbox interactions.

- The interface includes three buttons enabling the user to filter tasks: 'All' displays every task, 'Active' shows only incomplete tasks, and 'Completed' reveals completed tasks. 
- To facilitate task management, there's a 'Delete' button that, when clicked, removes all completed tasks from the list.
- When you click the delete button, a confirmation message is displayed to ensure your intention. 
- The process then proceeds based on your response."

### Modules
- This project incorporates Bootstrap, which was installed in the 'node_modules' directory using the command ```npm install bootstrap```
- Additionally, the ```npm install @fontsource-audiowide``` command was used to install the 'Autewide' font-family, which is utilized within both the CSS and JavaScript components of the project.

### Get Data from API
```javascript
const res = await fetch("https://api.quotable.io/quotes/random")
```
- The project retrieves data from an API to display random quotes to the user. This is achieved through the use of the Fetch API and an asynchronous/await structure.- 
Upon page load, the application fetches data from the API and dynamically writes it to the DOM along with the respective author information.
