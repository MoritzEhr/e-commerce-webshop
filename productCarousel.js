document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".products__list");
  const prevBtn = document.querySelector(".products__arrow--prev");
  const nextBtn = document.querySelector(".products__arrow--next");
  const productCards = document.querySelectorAll(".product-card");
  const filterTabs = document.querySelectorAll(".products__filter");

  let scrollAmount = 0;
  const scrollStep = 300; // anpassen je nach Kartengröße

  // Navigation Buttons
  prevBtn.addEventListener("click", () => {
    productList.scrollBy({
      left: -scrollStep,
      behavior: "smooth"
    });
  });

  nextBtn.addEventListener("click", () => {
    productList.scrollBy({
      left: scrollStep,
      behavior: "smooth"
    });
  });

  // Filter-Logik
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const category = tab.getAttribute("data-category");

      // Tab-Styles updaten
      filterTabs.forEach(t => t.classList.remove("products__filter--active"));
      tab.classList.add("products__filter--active");

      // Karten filtern
      productCards.forEach(card => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      // Zurückscrollen
      productList.scrollTo({
        left: 0,
        behavior: "auto"
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".products__list");
  const prevBtn = document.querySelector(".products__arrow--prev");
  const nextBtn = document.querySelector(".products__arrow--next");

  const scrollStep = 300;

  function updateArrowButtons() {
    const maxScrollLeft = productList.scrollWidth - productList.clientWidth;

    prevBtn.disabled = productList.scrollLeft <= 0;
    nextBtn.disabled = productList.scrollLeft >= maxScrollLeft - 1;
  }

  prevBtn.addEventListener("click", () => {
    productList.scrollBy({
      left: -scrollStep,
      behavior: "smooth"
    });
  });

  nextBtn.addEventListener("click", () => {
    productList.scrollBy({
      left: scrollStep,
      behavior: "smooth"
    });
  });

  productList.addEventListener("scroll", updateArrowButtons);
  window.addEventListener("resize", updateArrowButtons);

  updateArrowButtons(); // initialer Status beim Laden
});