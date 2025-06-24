// ===== DYNAMIC LAYOUT MANAGER =====
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const sidebar = document.querySelector('.products-sidebar');
  const header = document.querySelector('.main-header');
  const productsSection = document.querySelector('.products');
  const sidebarProducts = document.querySelector('.sidebar-products');

  // Configurable Values
  const config = {
    desktopBreakpoint: 1024,    // Minimum width for desktop layout
    sidebarWidth: 280,         // px
    sidebarOffset: 32,         // px margin from left
    headerHeight: 100,         // px (match your header height)
    animationSpeed: 40         // seconds for full animation cycle
  };

  // Clone products for seamless animation loop
  const products = document.querySelectorAll('.sidebar-products .product-card');
  products.forEach(product => {
    sidebarProducts.appendChild(product.cloneNode(true));
  });

  // Main Layout Controller
  function updateLayout() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Always enforce desktop-style sidebar positioning
    sidebar.style.position = 'sticky';
    sidebar.style.top = `${config.headerHeight + 20}px`; // 20px extra spacing
    sidebar.style.width = `${config.sidebarWidth}px`;
    sidebar.style.marginLeft = `${config.sidebarOffset}px`;
    sidebar.style.height = `${viewportHeight - config.headerHeight - 40}px`; // Dynamic height
    

    // Control animation based on visibility
    if (isElementVisible(sidebar)) {
      startSidebarAnimation();
    } else {
      stopSidebarAnimation();
    }
  }

  // Animation Control
  function startSidebarAnimation() {
    sidebarProducts.style.animation = `scrollProducts ${config.animationSpeed}s linear infinite`;
    sidebarProducts.addEventListener('animationiteration', resetAnimationPosition);
  }

  function stopSidebarAnimation() {
    sidebarProducts.style.animation = 'none';
    sidebarProducts.removeEventListener('animationiteration', resetAnimationPosition);
  }

  function resetAnimationPosition() {
    sidebarProducts.style.transition = 'none';
    sidebarProducts.style.transform = 'translateY(0)';
    setTimeout(() => {
      sidebarProducts.style.transition = '';
    }, 10);
  }

  // Visibility Checker (for performance)
  function isElementVisible(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight && 
      rect.bottom >= 0 && 
      rect.width > 0 && 
      rect.height > 0
    );
  }

  // Event Listeners
  window.addEventListener('resize', debounce(updateLayout, 100));
  window.addEventListener('scroll', debounce(checkSidebarVisibility, 50));

  sidebar.addEventListener('mouseenter', () => {
    sidebarProducts.style.animationPlayState = 'paused';
  });

  sidebar.addEventListener('mouseleave', () => {
    sidebarProducts.style.animationPlayState = 'running';
  });

  // Performance-optimized event listeners
  function debounce(fn, delay) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay);
    };
  }

  function checkSidebarVisibility() {
    if (isElementVisible(sidebar)) {
      startSidebarAnimation();
    } else {
      stopSidebarAnimation();
    }
  }

  // Initialize
  updateLayout();
});

// ===== DYNAMIC CSS INJECTION =====
document.addEventListener('DOMContentLoaded', function() {
  // Inject keyframe animation via JS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scrollProducts {
      0% { transform: translateY(0); }
      100% { transform: translateY(-50%); }
    }
  `;
  document.head.appendChild(style);
});