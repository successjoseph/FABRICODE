const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");
const cartSummary = document.getElementById("cart-summary");
const emptyCartMessage = document.getElementById("empty-cart-message");

let total = 0;

function renderCart() {
  cartItemsContainer.innerHTML = "";
  total = 0;
  if (cart.length === 0) {
    emptyCartMessage.style.display = "flex";
    cartItemsContainer.classList.add("hidden");
    cartSummary.classList.add("hidden");
    cartTotalDisplay.textContent = "0";
    return;
  } else {
    emptyCartMessage.style.display = "none";
    cartItemsContainer.classList.remove("hidden");
    cartSummary.classList.remove("hidden");
  }
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
  cartTotalDisplay.textContent = total.toLocaleString();
}

renderCart();

cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const idx = parseInt(e.target.dataset.index, 10);
    cart.splice(idx, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

