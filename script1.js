const formOpenBtn = document.querySelector("#form-open");
const home = document.querySelector(".home");
const formContainer = document.querySelector(".form_container");
const formCloseBtn = document.querySelector(".form_close");
const signupBtn = document.querySelector("#signup");
const loginBtn = document.querySelector("#login");
const pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

// Signup functionality
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

// Login functionality
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

// Function to handle signup
function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Retrieve stored users from localStorage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  const existingUser = storedUsers.find(user => user.email === email);
  if (existingUser) {
    alert("Email already exists. Please choose a different email.");
    return;
  }

  // Create new user
  const newUser = {
    email,
    password
  };
  storedUsers.push(newUser);

  // Store updated users in localStorage
  localStorage.setItem("users", JSON.stringify(storedUsers));
  window.location.href = "index.html";
}

// Function to handle login
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Retrieve stored users from localStorage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Find the user with matching email and password
  const user = storedUsers.find(user => user.email === email && user.password === password);
  if (user) {
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password.");
  }
}

// Attach event listeners
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", handleSignup);

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", handleLogin);
