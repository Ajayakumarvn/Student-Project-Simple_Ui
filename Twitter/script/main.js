const darkModeToggle = document.querySelector("#darkModeToggle");
const body = document.querySelector("body");

darkModeToggle.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});

function login(event) {
  event.preventDefault(); // Prevent form submission and page reload

  // Get the username and password inputs
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;

  // Store the user details in session storage
  sessionStorage.setItem("username", username);

  // Redirect to the next page (e.g., index.html)
  window.location.href = "index.html";
}
