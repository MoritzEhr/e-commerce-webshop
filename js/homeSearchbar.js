// Home page search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.hero .search-box input');
    const searchButton = document.querySelector('.hero .search-box button');
    
    // Function to handle search redirect
    function handleSearch() {
        const searchTerm = searchInput ? searchInput.value.trim() : '';
        
        if (searchTerm) {
            const redirectUrl = `products.html?search=${encodeURIComponent(searchTerm)}`;
            window.location.href = redirectUrl;
        }
    }
    
    // Handle button click
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default behavior
            handleSearch();
        });
    } 
    
    // Handle Enter key press
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                handleSearch();
            }
        });
    }
});