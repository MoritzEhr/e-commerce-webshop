document.addEventListener("DOMContentLoaded", function () {
    const cartSection = document.getElementById("cart-section");
    const personalSection = document.getElementById("personal-section");
    const checkoutSection = document.getElementById("checkout-section");

    const timelineSteps = document.querySelectorAll(".timeline-step");

    const nextToPersonal = document.getElementById("nextToPersonal");
    const backToCart = document.getElementById("backToCart");
    const nextToCheckout = document.getElementById("nextToCheckout");
    const backToPersonal = document.getElementById("backToPersonal");
    const placeOrder = document.getElementById("placeOrder");

    const personalForm = document.getElementById("personalInfoForm");
    const paymentForm = document.getElementById("paymentForm");

    function showSection(section) {
        document.querySelectorAll(".checkout-section").forEach(sec => {
            sec.classList.remove("active");
        });
        section.classList.add("active");
    }

    function setActiveStep(stepName) {
        timelineSteps.forEach(step => {
            step.classList.remove("active");
            if (step.dataset.step === stepName) {
                step.classList.add("active");
            }
        });
    }

    function isCartEmpty() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        return cartItems.length === 0;
    }

    function updateNextToPersonalButton() {
        if (isCartEmpty()) {
            nextToPersonal.disabled = true;
            nextToPersonal.classList.add("disabled");
        } else {
            nextToPersonal.disabled = false;
            nextToPersonal.classList.remove("disabled");
        }
    }

    function showOrderConfirmation() {
        // Create and show success message
        const successMessage = document.createElement("div");
        successMessage.className = "order-success";
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your purchase. Your order has been received.</p>
                <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;

        // Clear the checkout section and show success message
        checkoutSection.innerHTML = "";
        checkoutSection.appendChild(successMessage);

        // Clear the cart
        localStorage.removeItem("cartItems");

        // Update cart count and panel
        const cartCount = document.getElementById("cartCount");
        if (cartCount) {
            cartCount.style.display = "none";
        }

        // Update cart panel if it exists
        const cartContent = document.querySelector(".cart-content");
        if (cartContent) {
            cartContent.innerHTML = "<p>Your cart is currently empty.</p>";
        }

        const cartSubtotal = document.getElementById("cartSubtotal");
        if (cartSubtotal) {
            cartSubtotal.textContent = "€0.00";
        }
    }

    nextToPersonal.addEventListener("click", function () {
        // Only proceed if cart is not empty and button is not disabled
        if (!isCartEmpty() && !nextToPersonal.disabled) {
            showSection(personalSection);
            setActiveStep("personal");
        }
    });

    backToCart.addEventListener("click", function () {
        showSection(cartSection);
        setActiveStep("cart");
    });

    nextToCheckout.addEventListener("click", function () {
        if (personalForm.checkValidity()) {
            showSection(checkoutSection);
            setActiveStep("checkout");
        } else {
            personalForm.reportValidity(); // Shows user what's missing
        }
    });

    backToPersonal.addEventListener("click", function () {
        showSection(personalSection);
        setActiveStep("personal");
    });

    placeOrder.addEventListener("click", function (e) {
        e.preventDefault();
        if (paymentForm.checkValidity()) {
            showOrderConfirmation();
        } else {
            paymentForm.reportValidity();
        }
    });

    // Initialize button state on page load
    updateNextToPersonalButton();

    // Optional: Listen for storage changes to update button state dynamically
    window.addEventListener("storage", function(e) {
        if (e.key === "cartItems") {
            updateNextToPersonalButton();
        }
    });
});