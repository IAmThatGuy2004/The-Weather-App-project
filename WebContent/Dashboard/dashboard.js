// dashboard.js

// Select DOM elements
const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");
const profileLogo = document.getElementById("profile-logo");
const dropdownMenu = document.getElementById("dropdown-menu");
const toggleDarkMode = document.getElementById("toggle-dark-mode");  
const darkModeIcon = document.getElementById("dark-mode-icon");
const darkModeText = document.getElementById("dark-mode-text");

// Function to open the sidebar
function openSidebar() {
  sidebar.classList.add("active");
}

function toggleSidebar() {  //Toggle sidebar function handles both Opening and closing of the side bar
  sidebar.classList.toggle("active"); //adds the active class if its not present and removes it if it is.

  // Update the aria-expanded attribute for accessibility
  const isActive = sidebar.classList.contains("active"); //checks whether sidebar is currently active
  menuIcon.setAttribute("aria-expanded", isActive); //dynamically updates the aria-expanded attribute of the menu-icon
}

// Function to toggle the dropdown menu
function toggleDropdown() {
  dropdownMenu.classList.toggle("active");
}

// Function to close dropdown if clicking outside
function closeDropdown(event) {
  if (!dropdownMenu.contains(event.target) && event.target !== profileLogo) {
    dropdownMenu.classList.remove("active");
  }
}

function toggleDarkModeFunction() {    //Changes the entire body function to darkmode and back to light mode on the toggle of the button.
  document.body.classList.toggle("dark-mode");   //Adds dark mode to the body if it is not present,removes if it is.

  // Update the icon and text based on the current mode
  if (document.body.classList.contains("dark-mode")) {   //If the Body contains dark mode then remove the moon logo and replace it with the sun logo
    darkModeIcon.classList.remove("fa-moon");
    darkModeIcon.classList.add("fa-sun");
    darkModeText.textContent = "Light Mode";
  } else {
    darkModeIcon.classList.remove("fa-sun");
    darkModeIcon.classList.add("fa-moon");
    darkModeText.textContent = "Dark Mode";
  }
}



// Event listeners
menuIcon.addEventListener("click", toggleSidebar); //The type of event to listen to is click, if that happens, toggle sidebar.
profileLogo.addEventListener("click", toggleDropdown);
window.addEventListener("click", closeDropdown);
toggleDarkMode.addEventListener("click", toggleDarkModeFunction); //On click of the darkmode button, it will call the ToggelDarkModeFunction