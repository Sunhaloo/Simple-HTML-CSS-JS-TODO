// function that is going to be able to display the current date
function getCurrentDate() {
  // initalise variable that is going to hold the current date
  let currentDate = new Date();

  // split the current date into an array
  // INFO: need to convert the data object to string then use `.split`
  currentDate = currentDate.toString().split(" ");

  // get only the date, month and year
  document.getElementById("current-date").innerHTML =
    currentDate[2] + " " + currentDate[1] + " " + currentDate[3];
}

// function to display the date on the current page
window.onload = function () {
  // call the function to display the current date
  getCurrentDate();
};

// create an array that is going to hold some greetings that will be displayed
const greetings = ["Hello", "Hi", "What's Up", "How's Going"];

// get a random index from the `greetings` array
const randomGreetingIndex = Math.floor(Math.random() * greetings.length);

// get the `span` tag as an object
let spanHeadingGreet = document.getElementById("greetings-heading");

// display the "random" greeting on the 'HTML' page
spanHeadingGreet.innerHTML = greetings[randomGreetingIndex];
