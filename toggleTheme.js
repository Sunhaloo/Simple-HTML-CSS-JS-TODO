// get the button that is going to change the theme
let themeToggleButtonElement = document.getElementById("theme-button");

// get the "material" icons that of the theme button
let themeToggleIconElement = document.querySelector(
  ".material-symbols-outlined",
);

// get the `theme` key from the local storage
let systemTheme = localStorage.getItem("theme");

// set the default key-value pair for `theme` key if not already set
if (systemTheme === null) {
  // INFO: meaning that the page is using the light theme by default
  systemTheme = "light";
  // thus, set the key-value pair for 'theme' to 'light'
  localStorage.setItem("theme", systemTheme);
}

// Apply the theme based on the systemTheme
if (systemTheme === "dark") {
  // change the whole page to the 'dark' mode
  document.documentElement.classList.add("dark-mode");
  // change the button theme to the 'dark' mode
  themeToggleButtonElement.classList.add("dark-mode");
  // change the icon of the button ( toggling the theme )
  themeToggleIconElement.textContent = "dark_mode";
} else {
  // meaning that the user is actually using the light theme

  // change the whole page to the 'light' mode
  document.documentElement.classList.remove("dark-mode");
  // change the button theme to the 'light' mode
  themeToggleButtonElement.classList.remove("dark-mode");
  // change the icon of the button ( toggling the theme )
  themeToggleIconElement.textContent = "light_mode";
}

// add the "click" implementation for the button
themeToggleButtonElement.addEventListener("click", () => {
  // switch the whole page to the 'dark' mode
  document.documentElement.classList.toggle("dark-mode");
  // switch the button to the 'dark' mode
  themeToggleButtonElement.classList.toggle("dark-mode");

  // check if the current theme is the dark theme
  const isDarkMode = document.documentElement.classList.contains("dark-mode");

  // change the icon of the button depending on the theme
  themeToggleIconElement.textContent = isDarkMode ? "dark_mode" : "light_mode";

  // change the 'theme' key to `dark` in the local storage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});
