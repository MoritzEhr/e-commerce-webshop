document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".products__list");
  const prevBtn = document.querySelector(".products__arrow--prev");
  const nextBtn = document.querySelector(".products__arrow--next");
  const productCards = document.querySelectorAll(".product-card");
  const filterTabs = document.querySelectorAll(".products__tab");

  let scrollAmount = 0;
  const scrollStep = 300; 


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

  updateArrowButtons(); 
});




