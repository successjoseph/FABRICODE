window.addEventListener('DOMContentLoaded', () => {
    const searchTerm = (localStorage.getItem('searchTerm') || '').toLowerCase().trim();
    const resultsList = document.getElementById('resultsList');
    if (!resultsList) return;
    if (!searchTerm) {
        resultsList.innerHTML = '<p>No search term provided.</p>';
        return;
    }
    fetch('../data/catalog.json')
        .then(response => response.json())
        .then(catalog => {
            let products = [];
            if (Array.isArray(catalog.newarrivals)) {
                products = products.concat(catalog.newarrivals);
            }
            if (catalog.categories) {
                Object.values(catalog.categories).forEach(arr => {
                    products = products.concat(arr);
                });
            }
            let results = products.filter(item => item.name.toLowerCase().includes(searchTerm));
            // Remove duplicates by name and price
            const seen = new Set();
            results = results.filter(item => {
                const key = item.name.toLowerCase() + '|' + item.price;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
            if (results.length === 0) {
                resultsList.innerHTML = '<p>No results found for "' + searchTerm + '".</p>';
            } else {
                results.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'searchItem';
                    div.innerHTML = `<img src="${item.image || '../assets/images/default.jpg'}" alt="${item.name}" style="width:80px;height:80px;border-radius:8px;margin-right:1rem;vertical-align:middle;object-fit:cover;"> <span><strong>${item.name}</strong> - ₦${item.price}<br><small>${item.description || ''}</small></span>`;
                    // Add to Cart button (no toggle, no design, unlimited add)
                    const btn = document.createElement('button');
                    btn.textContent = 'Add to Cart';
                    btn.onclick = function() {
                        let cart = [];
                        try {
                            cart = JSON.parse(localStorage.getItem('cart')) || [];
                        } catch (e) {}
                        cart.push({
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            description: item.description,
                            quantity: 1
                        });
                        localStorage.setItem('cart', JSON.stringify(cart));
                    };
                    div.appendChild(btn);
                    resultsList.appendChild(div);
                });
            }
        })
        .catch(() => {
            resultsList.innerHTML = '<p>Failed to load catalog data.</p>';
        });
});
