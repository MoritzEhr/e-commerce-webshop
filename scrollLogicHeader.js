document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    const sentinel = document.querySelector('#header-sentinel');
    let isSticky = false;

    const io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting && !isSticky) {
            // Sentinel ist aus dem Viewport -> sticky aktivieren
            isSticky = true;
            header.classList.add('sticky');

            header.classList.add('show');

        } else if (entry.isIntersecting && isSticky) {
            // Sentinel ist wieder sichtbar -> sticky deaktivieren
            header.classList.remove('show');

            header.addEventListener('transitionend', function handler() {
                header.classList.remove('sticky');
                isSticky = false;
                header.removeEventListener('transitionend', handler);
            }, {
                once: true
            });
        }
    }, {
        root: null,
        threshold: 0
    });

    io.observe(sentinel);
});

cartButton.addEventListener("click", () => {
  cartPanel.classList.add("open");
  document.body.classList.add("cart-open"); // Overlay aktivieren
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
  document.body.classList.remove("cart-open"); // Overlay entfernen
});
