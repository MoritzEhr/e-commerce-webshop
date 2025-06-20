document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.querySelector('.checkout-button');
    
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            localStorage.setItem('activeCheckoutSection', 'personal-info');
            window.location.href = 'shoppingCart.html';
        });
    }
}); 