// UNIFIED SEARCH FUNCTIONALITY FOR BOTH HOME AND PRODUCTS PAGES
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const productList = document.querySelector('.products__grid');

    function getSearchParameter() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('search');
    }

    function setSearchFromURL() {
        const searchTerm = getSearchParameter();
        if (searchTerm && searchInput) {
            searchInput.value = searchTerm;
            performSearch(searchTerm);
        }
    }

    function performSearch(searchTerm) {
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
            return;
        }

        if (productList) {
            const normalizedSearchTerm = searchTerm.toLowerCase();
            const products = productList.getElementsByClassName('product-card');
            let hasResults = false;

            Array.from(products).forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(normalizedSearchTerm)) {
                    product.style.display = '';
                    hasResults = true;
                } else {
                    product.style.display = 'none';
                }
            });

            let noResultsMessage = document.querySelector('.no-results-message');
            if (!hasResults && normalizedSearchTerm !== '') {
                if (!noResultsMessage) {
                    noResultsMessage = document.createElement('div');
                    noResultsMessage.className = 'no-results-message';
                    noResultsMessage.innerHTML = `
                        <i class="fas fa-search"></i>
                        <p>No products found matching "${normalizedSearchTerm}"</p>
                        <p class="suggestion">Try different keywords or check your spelling</p>
                    `;
                    noResultsMessage.style.cssText = `
                        text-align: center;
                        padding: 40px 20px;
                        color: #666;
                        font-size: 16px;
                    `;
                    noResultsMessage.querySelector('i').style.cssText = `
                        font-size: 48px;
                        color: #ccc;
                        margin-bottom: 20px;
                        display: block;
                    `;
                    noResultsMessage.querySelector('.suggestion').style.cssText = `
                        font-size: 14px;
                        color: #999;
                        margin-top: 10px;
                    `;
                    productList.parentNode.insertBefore(noResultsMessage, productList);
                }
            } else if (noResultsMessage) {
                noResultsMessage.remove();
            }
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('search', searchTerm);
                window.history.pushState({}, '', newUrl);

                performSearch(searchTerm);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase();
            performSearch(searchTerm);
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    const newUrl = new URL(window.location);
                    newUrl.searchParams.set('search', searchTerm);
                    window.history.pushState({}, '', newUrl);

                    performSearch(searchTerm);
                }
            }
        });
    }

    setSearchFromURL();
});