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

        checkoutSection.innerHTML = "";
        checkoutSection.appendChild(successMessage);

        localStorage.removeItem("cartItems");

        const cartCount = document.getElementById("cartCount");
        if (cartCount) {
            cartCount.style.display = "none";
        }

        const cartContent = document.querySelector(".cart-content");
        if (cartContent) {
            cartContent.innerHTML = "<p>Your cart is currently empty.</p>";
        }

        const cartSubtotal = document.getElementById("cartSubtotal");
        if (cartSubtotal) {
            cartSubtotal.textContent = "€0.00";
        }
    }

    const activeSection = localStorage.getItem('activeCheckoutSection');
    if (activeSection === 'personal-info') {
        showSection(personalSection);
        setActiveStep('personal');
        localStorage.removeItem('activeCheckoutSection');
    }

    nextToPersonal.addEventListener("click", function () {
        showSection(personalSection);
        setActiveStep("personal");
    });

    backToCart.addEventListener("click", function () {
        showSection(cartSection);
        setActiveStep("cart");
    });

    nextToCheckout.addEventListener("click", function () {
        if (validatePersonalInfo()) {
            showSection(checkoutSection);
            setActiveStep("checkout");
        }
    });

    backToPersonal.addEventListener("click", function () {
        showSection(personalSection);
        setActiveStep("personal");
    });

    placeOrder.addEventListener("click", function (e) {
        e.preventDefault();
        if (validatePayment()) {
            showOrderConfirmation();
        } else {
            paymentForm.reportValidity();
        }
    });

    updateNextToPersonalButton();

    window.addEventListener("storage", function(e) {
        if (e.key === "cartItems") {
            updateNextToPersonalButton();
        }
    });

    function showFieldError(input, message) {
        let error = input.parentElement.querySelector('.field-error');
        if (!error) {
            error = document.createElement('div');
            error.className = 'field-error';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
        input.classList.add('input-error');
    }
    function clearFieldError(input) {
        let error = input.parentElement.querySelector('.field-error');
        if (error) error.remove();
        input.classList.remove('input-error');
    }

    function validatePersonalInfo() {
        let valid = true;
        const form = personalForm;
        Array.from(form.elements).forEach(input => {
            if (input.tagName === 'BUTTON') return;
            clearFieldError(input);
            if (!input.checkValidity() || (input.type === 'select-one' && !input.value)) {
                let msg = '';
                if (!input.value) {
                    msg = 'This field is required.';
                } else if (input.type === 'email') {
                    msg = 'Please enter a valid email address.';
                } else if (input.type === 'tel') {
                    msg = 'Please enter a valid phone number.';
                } else {
                    msg = input.validationMessage || 'Please fill out this field.';
                }
                showFieldError(input, msg);
                valid = false;
            }
        });
        return valid;
    }

    function validatePayment() {
        let valid = true;
        const form = paymentForm;
        Array.from(form.elements).forEach(input => {
            if (input.tagName === 'BUTTON') return;
            clearFieldError(input);
            if (!input.checkValidity()) {
                let msg = '';
                if (!input.value) {
                    msg = 'This field is required.';
                } else if (input.name === 'cardNumber') {
                    msg = 'Please enter a valid card number.';
                } else if (input.name === 'expiryDate') {
                    msg = 'Please use the format MM/YY.';
                } else if (input.name === 'cvv') {
                    msg = 'Please enter a valid CVV (3 or 4 digits).';
                } else {
                    msg = input.validationMessage || 'Please fill out this field.';
                }
                showFieldError(input, msg);
                valid = false;
            }
        });     
        const cardNumber = form.cardNumber;
        if (cardNumber && cardNumber.value.replace(/\s+/g, '').length < 13) {
            showFieldError(cardNumber, 'Card number seems too short');
            valid = false;
        }
        const expiry = form.expiryDate;
        if (expiry && !/^\d{2}\/\d{2}$/.test(expiry.value)) {
            showFieldError(expiry, 'Please use the format MM/YY.');
            valid = false;
        }
        const cvv = form.cvv;
        if (cvv && !/^\d{3,4}$/.test(cvv.value)) {
            showFieldError(cvv, 'Please enter a valid CVV (3 or 4 digits).');
            valid = false;
        }
        return valid;
    }

    [personalForm, paymentForm].forEach(form => {
        if (!form) return;
        form.addEventListener('input', function(e) {
            clearFieldError(e.target);
        });
    });
});