document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    const sentinel = document.querySelector('#header-sentinel');
    let isSticky = false;

    // Function to check if we should show/hide the header
    function updateHeaderState() {
        const scrollY = window.proFansScroll ? window.proFansScroll.scrollY : window.pageYOffset;
        const sentinelRect = sentinel.getBoundingClientRect();
        
        if (sentinelRect.top < 0 && !isSticky) {
            // Sentinel is out of viewport -> activate sticky
            isSticky = true;
            header.classList.add('sticky');
            header.classList.add('show');
        } else if (sentinelRect.top >= 0 && isSticky) {
            // Sentinel is back in viewport -> deactivate sticky
            header.classList.remove('show');
            
            header.addEventListener('transitionend', function handler() {
                header.classList.remove('sticky');
                isSticky = false;
                header.removeEventListener('transitionend', handler);
            }, { once: true });
        }
    }

    // Initial check
    updateHeaderState();

    // Update on scroll
    window.addEventListener('scroll', updateHeaderState);

    // Also update when inertial scroll updates
    if (window.proFansScroll) {
        const originalUpdateScrollPosition = window.proFansScroll.updateScrollPosition;
        window.proFansScroll.updateScrollPosition = function() {
            originalUpdateScrollPosition.call(this);
            updateHeaderState();
        };
    }
});

