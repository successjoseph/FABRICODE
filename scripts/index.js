// Get modal
const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");

// Get nav buttons to open modals
const openLoginBtn = document.getElementById("open-login");
const openSignupBtn = document.getElementById("open-signup");

// Get "x" button inside modal
const closeButtons = document.querySelectorAll(".close-modal");

// Open Login Modal
openLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.removeAttribute("hidden");
});

// Open Signup Modal
openSignupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signupModal.removeAttribute("hidden");
});

// Close modals
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.setAttribute("hidden", true);
  });
});