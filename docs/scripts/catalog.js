// Helper to get query param
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

fetch('../data/catalog.json')
  .then(res => res.json())
  .then(data => {
    const categories = data.categories;
    const arrivals = data.newarrivals;
    const arrivalsContainer = document.getElementById('product-grid');
    const goodsContainer = document.getElementById('goods');
    const category = getCategoryFromURL();

    // Update heading and add/remove filter button
    const goodsSection = goodsContainer.closest('.featured-products');
    let heading = goodsSection.querySelector('h2');
    if (!heading) {
      heading = document.createElement('h2');
      goodsSection.prepend(heading);
    }
    let removeBtn = goodsSection.querySelector('.remove-filter-btn');
    if (removeBtn) removeBtn.remove();

    if (category && categories[category]) {
      heading.textContent = capitalize(category);
      const btn = document.createElement('button');
      btn.textContent = 'Remove Filter';
      btn.className = 'remove-filter-btn';
      btn.style.marginLeft = '1rem';
      btn.onclick = () => window.location = 'catalog.html';
      heading.after(btn);
    } else {
      heading.textContent = 'All Products';
    }

// ...existing code...

// Category filter without reload
document.querySelectorAll('.category-card[data-category]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const category = btn.getAttribute('data-category');
    // Update URL without reload
    history.pushState({category}, '', `?category=${category}`);
    // Re-render products
    renderCatalog(category);
  });
});

// Listen for browser navigation (back/forward)
window.addEventListener('popstate', (event) => {
  const category = event.state ? event.state.category : null;
  renderCatalog(category);
});

// Refactor catalog rendering into a function
function renderCatalog(categoryParam) {
  fetch('../data/catalog.json')
    .then(res => res.json())
    .then(data => {
      const categories = data.categories;
      const arrivals = data.newarrivals;
      const arrivalsContainer = document.getElementById('product-grid');
      const goodsContainer = document.getElementById('goods');
      const category = categoryParam || (new URLSearchParams(window.location.search)).get('category');

      // Update heading and add/remove filter button
      const goodsSection = goodsContainer.closest('.featured-products');
      let heading = goodsSection.querySelector('h2');
      if (!heading) {
        heading = document.createElement('h2');
        goodsSection.prepend(heading);
      }
      let removeBtn = goodsSection.querySelector('.remove-filter-btn');
      if (removeBtn) removeBtn.remove();

      if (category && categories[category]) {
        heading.textContent = capitalize(category);
        const btn = document.createElement('button');
        btn.textContent = 'Remove Filter';
        btn.className = 'remove-filter-btn';
        btn.style.marginLeft = '1rem';
        btn.onclick = () => {
          history.pushState({}, '', 'catalog.html');
          renderCatalog(null);
        };
        heading.after(btn);
      } else {
        heading.textContent = 'All Products';
      }

      // Render new arrivals (always show)
      arrivalsContainer.innerHTML = '';
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

      // Render filtered or all products
      goodsContainer.innerHTML = '';
      let productsToShow = [];
      if (category && categories[category]) {
        productsToShow = categories[category];
      } else {
        productsToShow = Object.values(categories).flat();
      }
      productsToShow.forEach(product => {
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
}

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
  const category = (new URLSearchParams(window.location.search)).get('category');
  renderCatalog(category);
});

// Add to Cart handler (optional, if not already present)
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
}
);});
