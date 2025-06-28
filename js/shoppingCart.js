// SHOPPING CART
const cartButton = document.querySelector(".cart-button");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartContent = cartPanel.querySelector(".cart-content");
const cartCount = document.getElementById("cartCount");
const cartSubtotalEl = document.getElementById("cartSubtotal");

let cartItems = loadCart();

cartButton.addEventListener("click", () => {
  cartPanel.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

function loadCart() {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
}

function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function renderCart() {
  cartContent.innerHTML = "";

  if (cartItems.length === 0) {
    cartContent.innerHTML = "<p>Your cart is currently empty.</p>";
    cartSubtotalEl.textContent = "€0.00";
    cartCount.style.display = "none";
    return;
  }

  cartItems.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";

    const imgWrapper = document.createElement("div");
    imgWrapper.className = "cart-item-image";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    imgWrapper.appendChild(img);

    const details = document.createElement("div");
    details.className = "cart-item-details";

    const titleRow = document.createElement("div");
    titleRow.className = "cart-item-title-row";

    const nameEl = document.createElement("div");
    nameEl.className = "cart-item-name";
    nameEl.textContent = item.name;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-item";
    removeBtn.innerHTML = "&times;";
    removeBtn.addEventListener("click", () => {
      removeFromCart(item.name);
    });

    titleRow.appendChild(nameEl);
    titleRow.appendChild(removeBtn);

    const qtyPrice = document.createElement("div");
    qtyPrice.className = "cart-item-quantity-price";
    const priceFormatted = parseFloat(item.price).toFixed(2);
    qtyPrice.textContent = `${item.quantity} × €${priceFormatted}`;

    details.appendChild(titleRow);
    details.appendChild(qtyPrice);

    itemEl.appendChild(imgWrapper);
    itemEl.appendChild(details);

    cartContent.appendChild(itemEl);
  });

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);
  cartSubtotalEl.textContent = `€${subtotal.toFixed(2)}`;

  const checkoutTotal = document.getElementById("checkoutTotal");
  if (checkoutTotal) {
    checkoutTotal.textContent = `€${subtotal.toFixed(2)}`;
  }

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalCount > 0) {
    cartCount.textContent = totalCount;
    cartCount.style.display = "inline-block";
  } else {
    cartCount.style.display = "none";
  }
}

function addToCart(name, price, image) {
  const existingItem = cartItems.find((itm) => itm.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({
      name,
      price,
      image,
      quantity: 1
    });
  }
  saveCart();
  renderCart();
  cartPanel.classList.add("open");
  document.body.classList.add("cart-open");
}

function removeFromCart(name) {
  cartItems = cartItems.filter((itm) => itm.name !== name);
  saveCart();
  renderCart();
}

document.querySelectorAll(".product-card__add").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = button.getAttribute("data-price");
    const image = button.getAttribute("data-image");
    addToCart(name, price, image);
  });
});


renderCart();

document.addEventListener("DOMContentLoaded", function () {
  function loadCart() {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  }

  function renderCart() {
    const cartItems = loadCart();
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is currently empty.</p>";
      document.getElementById("total").textContent = "€0.00";
      return;
    }

    let subtotal = 0;

    cartItems.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");

      itemEl.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-qty-price">
            ${item.quantity} × €${parseFloat(item.price).toFixed(2)}
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemEl);

      subtotal += item.quantity * parseFloat(item.price);
    });

    document.getElementById("total").textContent = `€${subtotal.toFixed(2)}`;
  }

  renderCart();
});

cartButton.addEventListener("click", () => {
  cartPanel.classList.add("open");
  document.body.classList.add("cart-open");
  n
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
  document.body.classList.remove("cart-open");
});

document.querySelectorAll('.checkout-button').forEach(button => {
  button.addEventListener('click', () => {
    localStorage.setItem('activeCheckoutSection', 'personal-info');
    window.location.href = 'shoppingCart.html';
  });
});