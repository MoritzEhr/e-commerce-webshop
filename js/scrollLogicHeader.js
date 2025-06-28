// SCROLL LOGIC HEADER
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    const sentinel = document.querySelector('#header-sentinel');
    let isSticky = false;
    const navToggle = document.querySelector('.nav-toggle');
    const mobileCartLink = document.getElementById('mobileCartLink');
    const cartPanel = document.getElementById('cartPanel');
    const cartCount = document.getElementById('cartCount');
    const mobileCartCount = document.getElementById('mobileCartCount');

    function updateHeaderState() {
        const scrollY = window.proFansScroll ? window.proFansScroll.scrollY : window.pageYOffset;
        const sentinelRect = sentinel.getBoundingClientRect();

        if (sentinelRect.top < 0 && !isSticky) {
            isSticky = true;
            header.classList.add('sticky');
            header.classList.add('show');
        } else if (sentinelRect.top >= 0 && isSticky) {
            header.classList.remove('show');

            header.addEventListener('transitionend', function handler() {
                header.classList.remove('sticky');
                isSticky = false;
                header.removeEventListener('transitionend', handler);
            }, {
                once: true
            });
        }
    }

    updateHeaderState();

    window.addEventListener('scroll', updateHeaderState);

    if (window.proFansScroll) {
        const originalUpdateScrollPosition = window.proFansScroll.updateScrollPosition;
        window.proFansScroll.updateScrollPosition = function () {
            originalUpdateScrollPosition.call(this);
            updateHeaderState();
        };
    }

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            const isOpen = header.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    if (mobileCartLink) {
        mobileCartLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (cartPanel) {
                cartPanel.classList.add('open');
                document.body.classList.add('cart-open');
                // Close nav menu
                header.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    }

    function syncCartCount() {
        if (cartCount && mobileCartCount) {
            mobileCartCount.textContent = cartCount.textContent;
            if (cartCount.style.display !== 'none' && cartCount.textContent !== '0') {
                mobileCartCount.style.display = 'inline-block';
            } else {
                mobileCartCount.style.display = 'none';
            }
        }
    }
    syncCartCount();
    if (cartCount && mobileCartCount) {
        const observer = new MutationObserver(syncCartCount);
        observer.observe(cartCount, {
            childList: true,
            characterData: true,
            subtree: true,
            attributes: true
        });
    }
});