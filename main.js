// create a global TODO variable to get "string" JSON data from local storage as JS objects
// if the key 'todo' has not been created, set global `todo` variable to empty list
todos = JSON.parse(localStorage.getItem("todos")) || [];

// function that is going to be responsible for displaying our TODO items
function displayTodos() {
  // variable to get our using the query selector
  const todoList = document.querySelector("#todo-list");

  // "reset" all the HTML page for the display part
  todoList.innerHTML = "";

  // iterate through each of the TODO objects found in the global array
  todos.forEach((todo) => {
    // create a new `div` HTML tag on the page to show TODO item
    const todoItem = document.createElement("div");

    // add the styling of the todo item using the class 'todo-form-section'
    todoItem.classList.add("list");

    // create a new `label` HTML tag on the page to show TODO description
    const label = document.createElement("label");
    // create a new `input` HTML tag on the page to show TODO checkbox "clickable" area
    const input = document.createElement("input");
    // create a new `span` HTML tag on the page to show TODO customised checkbox
    const span = document.createElement("span");

    // create `div` tags for 'category', 'content', 'actions', 'edit', 'delete' const category = document.createElement("div");
    const category = document.createElement("div");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    // change the type of the `input` tag
    input.type = "checkbox";
    // check if the TODO item has been completed / done
    input.checked = todo.done;

    // check for changes made at the input for checkboxes
    input.addEventListener("change", (e) => {
      // checked if the todo item is done
      todo.done = e.target.checked;

      // update the local storage to modify the global array
      localStorage.setItem("todos", JSON.stringify(todos));

      // call the function "resursively" to show the change
      displayTodos();
    });

    // add the styling of the todo item using the class 'bubble-business'
    span.classList.add("bubble-business");
    // add the styling of the category using the class 'todo-category'
    category.classList.add("todo-category");
    // add the styling of the todo item using the class 'bubble-business'
    content.classList.add("todo-content");
    // add the styling of the todo item using the class 'todo-action'
    actions.classList.add("todo-action");
    // add the styling of the todo item using the class 'todo-edit-button'
    editButton.classList.add("todo-edit-button");
    // add the styling of the todo item using the class 'todo-delete-button'
    deleteButton.classList.add("todo-delete-button");

    // display the `category` for each TODO item
    category.innerHTML = "#" + todo.category;
    // display the actual content for the TODO item
    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

    // display the 'edit' and 'delete' texts button according on the page
    editButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    // actually add all the elements to be shown on the HTML page
    // this is for the checkbox and text of todo item
    label.appendChild(input);
    label.appendChild(span);

    // this is for the buttons
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    // so that the whole thing is displayed on the page
    todoItem.appendChild(label);
    todoItem.appendChild(category);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    // finally add everything to the list
    todoList.appendChild(todoItem);

    // check if the TODO item has been checked off
    if (todo.done) {
      // add the styling of the todo item using the class 'done'
      todoItem.classList.add("done");
    }

    // check if the TODO item has been checked or not
    input.addEventListener("click", (e) => {
      // checked if the TODO item has been checked off
      todo.done = e.target.checked;

      // update the JSON data found inside the local storage
      localStorage.setItem("todos", JSON.stringify(todos));

      // check if the condition is the TODO item has been checked
      if (todo.done) {
        // if TODO item has actually been checked ==> apply the styling
        todoItem.classList.add("done");

        // but if the TODO item has not been checked off
      } else {
        // if TODO item has NOT been checked ==> remove the styling
        todoItem.classList.remove("done");
      }
    });

    // implement the 'Edit' button
    editButton.addEventListener("click", (e) => {
      // get the content of the TODO item
      const input = content.querySelector("input");

      // remove the `readonly` attribute from the `<input>` taga completely
      input.removeAttribute("readonly");

      // set the input element to be active to be able to receive changes
      input.focus();

      // check if the user clicks somewhere else when editing TODO item
      input.addEventListener("blur", (e) => {
        // re-apply the `readonly` attribute to the `<input>` tag
        input.setAttribute("readonly", true);

        // update the todo item's content
        todo.content = input.value;

        // if change did occur ==> update the local storage
        localStorage.setItem("todos", JSON.stringify(todos));

        // refresh - display the update on the page
        displayTodos();
      });
    });

    // implement the 'Delete' button
    deleteButton.addEventListener("click", (e) => {
      // the actual code that is going to allow us to remove the TODO item
      todos = todos.filter((t) => t != todo);

      // update the local storage
      localStorage.setItem("todos", JSON.stringify(todos));

      // refresh - display the update on the page
      displayTodos();
    });
  });
}

// when the whole thing ( HTML pages and objects ) is loaded
window.addEventListener("load", () => {
  // variable for the user's name for the "welcome" heading ( as a JS object )
  const nameInput = document.getElementById("username");

  // variable for whole TODO "creation" form itself ( as a JS object )
  const newTodoForm = document.getElementsByClassName("new-todo-form")[0];

  // variable to store the user's name from the local storage
  // if there are no 'username' key ==> default to a 'string'
  const username = localStorage.getItem("username") || "";

  // after the user enters the username ==> get that username "values"
  nameInput.value = username;

  // check for changes made at the input for username
  nameInput.addEventListener("change", (e) => {
    // if there is a name entered there or username has changed ==> save to local storage
    localStorage.setItem("username", e.target.value);
  });

  // check for any submission of TODOs
  newTodoForm.addEventListener("submit", (e) => {
    // stop the browser from executing its default action
    e.preventDefault();

    // get the content from the input field
    const content = e.target.elements.content.value;

    // if the content is empty or just whitespace, prevent adding the todo
    if (!content.trim()) {
      return;
    }

    // create a `todo` object
    const todo = {
      // use the variable `content` from above to save the actual content user entered
      content,
      // use the variable name `category` to save the category selected for each TODO item
      category: e.target.elements.category.value,
      // new TODO item created ==> not done yet
      done: false,
      // specify the current time at which the TODO item was created
      createdAt: new Date().getTime(),
    };

    // add new todo to the global array `todos`
    todos.push(todo);

    // save the new TODO item created to the local storage
    // use `JSON.stringify()` to convert the JS object to "JSON" string
    localStorage.setItem("todos", JSON.stringify(todos));

    // reset the TODO input and categories
    e.target.reset();

    // call the display function after creation of TODO item
    displayTodos();
  });

  // call the function ( "all the time" ) to display the TODO items
  displayTodos();
});
