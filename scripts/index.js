const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const SCROLL_THRESHOLD = 50;

  // Click → open/close nav and swap emojis
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    // 🙈 closed → 🙉 open
    menuToggle.textContent = isOpen ? '🙉' : '🙈';
  });

  // Scroll → hide when beyond threshold, re-show near top
  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      // hide toggle and ensure nav is closed
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.textContent = '🙈';
      }
    } else {
      // re-show toggle
      menuToggle.classList.remove('hidden');
    }
  });



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