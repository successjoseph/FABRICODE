const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");

let total = 0;

// Render each item as a card
cart.forEach((item, index) => {
  total += item.price;

  const card = document.createElement("div");
  card.className = "cart-item";
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <div class="cart-item-info">
      <h4>${item.name}</h4>
      <p class="price">₦${item.price.toLocaleString()}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
    </div>
  `;

  cartItemsContainer.appendChild(card);
});

// Display total
cartTotalDisplay.textContent = total.toLocaleString();

// Handle remove clicks
cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const idx = parseInt(e.target.dataset.index, 10);
    cart.splice(idx, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
});