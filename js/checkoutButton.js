document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.querySelector('.checkout-button');
    
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            // Store the active section in localStorage
            localStorage.setItem('activeCheckoutSection', 'personal-info');
            // Redirect to shopping cart page
            window.location.href = 'shoppingCart.html';
        });
    }
}); 