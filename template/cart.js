let selectedBooks = {};
let cartItems;

async function showCartItems() {
    const accountId = localStorage.getItem('account_id');

    try {
        const response = await axios.get(`http://localhost:8000/show_cart?reader_id=${accountId}`);
        cartItems = response.data.reader_cart;

        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = ''; // Clear the cart items before rendering new data

        cartItems.forEach(item => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('col-md-4', 'mb-4');
            console.log(cartItems)


            const bookInfo = `
                <div class="card">
                    <img src="images/${item.name}.jpg" class="card-img-top" alt="${item.name} Image">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Price: ${item.price} coin</p>
                        <button class="btn btn-danger" onclick="console.log('Clicked with id:', ${item.id}); removeFromCart(${item.id})">Remove</button>
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

        updateTotalCoins();
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}

async function removeFromCart(bookId) {
    const accountId = localStorage.getItem('account_id');
    try {
        await axios.delete(`http://127.0.0.1:8000/remove_book?reader_id=${accountId}&book_id=${bookId}`);

        // After successful removal, refresh the cart items
        showCartItems();
        
    } catch (error) {
        console.error('Error removing book from cart:', error);
    } finally {
        // Reset the flag after removal
        removeTriggered = false;
    }
}





// Call the showCartItems function when the cart.html page loads
window.onload = function () {
    showCartItems();
};

