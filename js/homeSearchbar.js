// HOME PAGE SEARCH FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.hero .search-box input');
    const searchButton = document.querySelector('.hero .search-box button');

    function handleSearch() {
        const searchTerm = searchInput ? searchInput.value.trim() : '';

        if (searchTerm) {
            const redirectUrl = `products.html?search=${encodeURIComponent(searchTerm)}`;
            window.location.href = redirectUrl;
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', function (e) {
            e.preventDefault();
            handleSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }
});