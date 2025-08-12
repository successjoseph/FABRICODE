window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('catalog-search');
    const searchBtn = document.querySelector('.search-btn');

    // Store search term in localStorage and redirect
    function goToResultsPage(searchTerm) {
        localStorage.setItem('searchTerm', searchTerm);
        window.location.href = 'search-results.html';
    }

    if (!searchInput) {
        console.warn('Search input not found.');
        return;
    }

    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm) goToResultsPage(searchTerm);
        });
    }
    // Search on Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm) goToResultsPage(searchTerm);
        }
    });
});
