/* script.js */

const cartButton   = document.querySelector(".cart-button");
const cartPanel    = document.getElementById("cartPanel");
const closeCart    = document.getElementById("closeCart");
const cartContent  = cartPanel.querySelector(".cart-content");
const cartCount    = document.getElementById("cartCount");
const cartSubtotalEl = document.getElementById("cartSubtotal");

let cartItems = [];

// ‣ Warenkorb öffnen
cartButton.addEventListener("click", () => {
  cartPanel.classList.add("open");
});

// ‣ Warenkorb schließen (X-Button)
closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

// ‣ Render-Funktion: Inhalt des Warenkorbs aufbauen
function renderCart() {
  cartContent.innerHTML = "";

  if (cartItems.length === 0) {
    cartContent.innerHTML = "<p>Ihr Warenkorb ist noch leer.</p>";
    cartSubtotalEl.textContent = "€0.00";

    // Badge verstecken
    cartCount.style.display = "none";
    return;
  }


  // Für jedes Item ein .cart-item erzeugen
  cartItems.forEach((item) => {
    // 1) Container für das Item
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";

    // 2) Bild
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "cart-item-image";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    imgWrapper.appendChild(img);

    // 3) Details-Container
    const details = document.createElement("div");
    details.className = "cart-item-details";

    // 3a) Name + Remove-Button in einer Zeile
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

    // 3b) Menge × Preis
    const qtyPrice = document.createElement("div");
    qtyPrice.className = "cart-item-quantity-price";
    const priceFormatted = parseFloat(item.price).toFixed(2);
    qtyPrice.textContent = `${item.quantity} × €${priceFormatted}`;

    details.appendChild(titleRow);
    details.appendChild(qtyPrice);

    // 4) Alles zusammen in .cart-item packen
    itemEl.appendChild(imgWrapper);
    itemEl.appendChild(details);

    // 5) Ins DOM einfügen
    cartContent.appendChild(itemEl);
  });

  // ‣ Subtotal berechnen und anzeigen
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);
  cartSubtotalEl.textContent = `€${subtotal.toFixed(2)}`;

  // ‣ Gesamtanzahl aktualisieren
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;

    if (totalCount > 0) {
    // Wert setzen und Badge einblenden
    cartCount.textContent = totalCount;
    cartCount.style.display = "inline-block";
  } else {
    // Bei 0 verstecken
    cartCount.style.display = "none";
  }
}

// ‣ Artikel hinzufügen (wird durch Button-Click ausgelöst)
function addToCart(name, price, image) {
  const existingItem = cartItems.find((itm) => itm.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name, price, image, quantity: 1 });
  }
  renderCart();
  cartPanel.classList.add("open");
}

// ‣ Artikel komplett aus dem Warenkorb entfernen
function removeFromCart(name) {
  cartItems = cartItems.filter((itm) => itm.name !== name);
  renderCart();
}

// ‣ „In den Warenkorb“-Buttons anknüpfen
document.querySelectorAll(".product-card__add").forEach((button) => {
  button.addEventListener("click", () => {
    const name  = button.getAttribute("data-name");
    const price = button.getAttribute("data-price");
    const image = button.getAttribute("data-image");
    addToCart(name, price, image);
  });
});

// Initiales Rendern (Warenkorb leer)
renderCart();
