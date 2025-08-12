  const body       = document.body;
  const loginModal = document.getElementById('login-modal');
  const signupModal= document.getElementById('signup-modal');
  const openLogin  = document.getElementById('open-login');
  const openSignup = document.getElementById('open-signup');
  const closeBtns  = document.querySelectorAll('.close-modal');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const SCROLL_THRESHOLD = 50;
  const userTrigger    = document.getElementById('user-trigger');
  const userDropdown   = document.querySelector('.user-dropdown');
  const dropdownLogin  = document.getElementById('dropdown-login');
  const dropdownSignup = document.getElementById('dropdown-signup');

// Toggle dropdown on icon click
userTrigger.addEventListener('click', e => {
  e.preventDefault();
  userDropdown.classList.toggle('hidden');
});

// Open Login modal
dropdownLogin.addEventListener('click', e => {
  e.preventDefault();
  openModal(loginModal);
  userDropdown.classList.add('hidden');
});

// Open Signup modal
dropdownSignup.addEventListener('click', e => {
  e.preventDefault();
  openModal(signupModal);
  userDropdown.classList.add('hidden');
});

// Close dropdown if clicking outside
document.addEventListener('click', e => {
  if (!userTrigger.contains(e.target) && !userDropdown.contains(e.target)) {
    userDropdown.classList.add('hidden');
  }
});

// Helpers
function openModal(modal) {
  modal.hidden = false;
  body.classList.add('modal-open');
}
function closeModals() {
  [loginModal, signupModal].forEach(m => m.hidden = true);
  body.classList.remove('modal-open');
}

// Closers (buttons + Escape key)
closeBtns.forEach(btn => btn.addEventListener('click', closeModals));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && body.classList.contains('modal-open')) {
    closeModals();
  }
});

  // Click → open/close nav and swap emojis
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
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

fetch('../data/catalog.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    const arrivals = data.newarrivals;
    const categories = data.categories;
    const arrivalsContainer = document.getElementById('product-grid');
    const goodsContainer = document.getElementById('goods');

    // Render new arrivals
    arrivals.forEach(product => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="price">₦${product.price.toLocaleString()}</p>
        <button data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
      `;
      arrivalsContainer.appendChild(card);
    });

    // Flatten all category arrays into one list
    const allProducts = Object.values(categories).flat();

    // Render full catalog
    allProducts.forEach(product => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="price">₦${product.price.toLocaleString()}</p>
        <button data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
      `;
      goodsContainer.appendChild(card);
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



