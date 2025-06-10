const cartButton     = document.querySelector(".cart-button");
const cartPanel      = document.getElementById("cartPanel");
const closeCart      = document.getElementById("closeCart");
const cartContent    = cartPanel.querySelector(".cart-content");
const cartCount      = document.getElementById("cartCount");
const cartSubtotalEl = document.getElementById("cartSubtotal");

let cartItems = loadCart(); // Bestehende Daten laden

// ‣ Warenkorb öffnen
cartButton.addEventListener("click", () => {
  cartPanel.classList.add("open");
});

// ‣ Warenkorb schließen (X-Button)
closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

// ‣ Funktion: Warenkorb aus localStorage laden oder initialisieren
function loadCart() {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
}

// ‣ Funktion: Warenkorb im localStorage speichern
function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// ‣ Render-Funktion: Inhalt des Warenkorbs aufbauen
function renderCart() {
  cartContent.innerHTML = "";

  if (cartItems.length === 0) {
    cartContent.innerHTML = "<p>Ihr Warenkorb ist noch leer.</p>";
    cartSubtotalEl.textContent = "€0.00";
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
  if (totalCount > 0) {
    cartCount.textContent = totalCount;
    cartCount.style.display = "inline-block";
  } else {
    cartCount.style.display = "none";
  }
}

// ‣ Artikel hinzufügen (ausgelöst durch Button-Click)
function addToCart(name, price, image) {
  const existingItem = cartItems.find((itm) => itm.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name, price, image, quantity: 1 });
  }
  saveCart();    // Warenkorb nach Änderung speichern
  renderCart();
  cartPanel.classList.add("open");
}

// ‣ Artikel komplett aus dem Warenkorb entfernen
function removeFromCart(name) {
  cartItems = cartItems.filter((itm) => itm.name !== name);
  saveCart();    // Warenkorb nach Änderung speichern
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

// Initiales Rendern (mit geladenen Daten)
renderCart();

// shoppingCart.js
document.addEventListener("DOMContentLoaded", function () {
  // Funktion: Warenkorb laden (aus localStorage, falls vorhanden)
  function loadCart() {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Wird beim Laden der Seite aufgerufen, um den Warenkorb in der Checkout-Ansicht darzustellen
  function renderCart() {
    const cartItems = loadCart();
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";

    // Wenn keine Artikel vorhanden sind, Meldung anzeigen
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is currently empty.</p>";
      document.getElementById("total").textContent = "€0.00";
      return;
    }

    // Zwischensumme berechnen
    let subtotal = 0;

    // Für jeden Artikel einen Eintrag im Warenkorb erstellen
    cartItems.forEach((item) => {
      // Artikel Element
      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");

      // Du kannst hier das Markup weiter anpassen – dieses Beispiel zeigt Bild, Name, Menge und Preis:
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

    // Gesamtpreis aktualisieren
    document.getElementById("total").textContent = `€${subtotal.toFixed(2)}`;
  }

  // Beim Laden der Seite den Warenkorb rendern
  renderCart();

  // Optional: Falls du dynamische Aktualisierungen vornehmen möchtest, 
  // kannst du EventListener hinzufügen, die bei Änderungen (z.B. Artikel entfernen) auch renderCart() erneut aufrufen.
});


