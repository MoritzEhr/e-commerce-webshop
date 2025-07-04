function positionAlsoBought() {
  const header = document.querySelector('.main-header');
  const footer = document.querySelector('.site-footer');
  const alsoBought = document.querySelector('.also-bought');

  if (!header || !footer || !alsoBought) return;

  const headerRect = header.getBoundingClientRect();
  const footerRect = footer.getBoundingClientRect();

  const headerBottom = headerRect.bottom + window.scrollY;
  const footerTop = footerRect.top + window.scrollY;

  const availableHeight = footerTop - headerBottom;
  const alsoBoughtHeight = alsoBought.offsetHeight;

  const top = headerBottom + (availableHeight - alsoBoughtHeight) / 2;

  alsoBought.style.position = 'absolute';
  alsoBought.style.top = `${top}px`;
}

// Improved initialization with multiple fallbacks
function initializePositioning() {
  // First try immediately
  positionAlsoBought();

  // Fallback: Check again after short delay
  setTimeout(positionAlsoBought, 50);

  // Final fallback: Check when everything is definitely loaded
  window.addEventListener('load', positionAlsoBought);
}

// Run initialization
initializePositioning();

// Handle dynamic changes
window.addEventListener('resize', positionAlsoBought);
window.addEventListener('scroll', positionAlsoBought);