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

fetch('../data/catalog.json')
    .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then((data) => {
    const arrivals = data.newarrivals;
    const container = document.getElementById('product-grid');

    arrivals.forEach(product => {
      const card = document.createElement('article');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="price">₦${product.price.toLocaleString()}</p>
        <button data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
      `;

      container.appendChild(card);
    });
  })
  .catch(console.error);

  document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Add to Cart') {
    const product = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      price: parseInt(e.target.dataset.price),
      image: e.target.dataset.image
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} added to cart.`);
  }
});