let selectedBooks = {};
async function showCartItems() {
    const accountId = localStorage.getItem('account_id');

    try {
        const response = await axios.get(`http://localhost:8000/show_cart?reader_id=${accountId}`);
        const cartItems = response.data.reader_cart;

        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = ''; // Clear the cart items before rendering new data

        cartItems.forEach(item => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('col-md-4', 'mb-4');

            const bookInfo = `
                <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="${item.book_name} Image">
                    <div class="card-body">
                        <h5 class="card-title">${item.book_name}</h5>
                        <p class="card-text">Price: ${item.price} coin</p>
                        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="bookCheckbox${item.id}" 
                                onchange="toggleBookSelection(${item.id})" ${selectedBooks[item.id] ? 'checked' : ''}>
                            <label class="form-check-label" for="bookCheckbox${item.id}">Select for Checkout</label>
                        </div>
                    </div>
                </div>
            `;

            bookItem.innerHTML = bookInfo;
            cartItemsContainer.appendChild(bookItem);
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}



// Call the showCartItems function when the cart.html page loads
window.onload = function () {
    showCartItems();
};
