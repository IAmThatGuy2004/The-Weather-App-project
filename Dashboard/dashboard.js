// dashboard.js

// Select DOM elements
const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");
const profileLogo = document.getElementById("profile-logo");
const dropdownMenu = document.getElementById("dropdown-menu");

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

// Event listeners
menuIcon.addEventListener("click", toggleSidebar); //The type of event to listen to is click, if that happens, toggle sidebar.
profileLogo.addEventListener("click", toggleDropdown);
window.addEventListener("click", closeDropdown);
