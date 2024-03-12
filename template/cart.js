let selectedBooks = [];
let cartItems;

async function showCartItems() {
    const accountId = localStorage.getItem('account_id');

    try {
        const response = await axios.get(`http://localhost:8000/show_cart?reader_id=${accountId}`);
        cartItems = response.data.reader_cart;

        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = '';

        if (cartItems === "Reader's cart is empty") {
            updateTotalCoins("Reader's cart is empty");
            return;
        } else {

        cartItems.forEach(item => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('col-md-4', 'mb-4');

            const bookInfo = `
                <div class="card">
                    <img src="images/${item.name}.jpg" class="card-img-top" alt="${item.name} Image">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Price: ${item.price} coin</p>
                        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="bookCheckbox${item.id}" 
                                onchange="toggleBookSelection(${item.id})" ${selectedBooks.includes(item.id) ? 'checked' : ''}>
                            <label class="form-check-label" for="bookCheckbox${item.id}">Select for Checkout</label>
                        </div>
                    </div>
                </div>
            `;

            
            bookItem.innerHTML = bookInfo;
            cartItemsContainer.appendChild(bookItem);
        });
        }

        updateTotalCoins();
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}

async function removeFromCart(bookId) {
    const accountId = localStorage.getItem('account_id');
    console.log('Removing book:', bookId);
    try {
        await axios.delete(`http://127.0.0.1:8000/remove_book?reader_id=${accountId}&book_id=${bookId}`);
        console.log('Book removed successfully');

        // After successful removal, refresh the cart items
        showCartItems();
        
    } catch (error) {
        console.error('Error removing book from cart:', error);
    }
}

function updateTotalCoins() {
    const totalCoinsElement = document.getElementById('totalCoins');
    let totalCoins = 0;

    if (cartItems === "Reader's cart is empty") {
        totalCoinsElement.textContent = "Reader's cart is empty";
        return;
    }

    for (const bookId of selectedBooks) {
        const bookItem = cartItems.find(item => item.id === bookId);
        if (bookItem) {
            console.log(bookItem)
            totalCoins += bookItem.price;
        }
    }
    totalCoinsElement.textContent = `Total purchase coins: ${totalCoins} coin Total rental coins: ${totalCoins*0.8} coin`;
}

function toggleBookSelection(bookId) {
    const index = selectedBooks.indexOf(bookId);

    if (index !== -1) {
        selectedBooks.splice(index, 1);
    } else {
        selectedBooks.push(bookId);
    }
    updateTotalCoins();
}

async function rent() {
    try {
        const accountId = localStorage.getItem('account_id');
        const response = await axios.post(`http://127.0.0.1:8000/rent?reader_id=${accountId}`, {
            book_id: selectedBooks
        });
        console.log(response.data.rent);
        Swal.fire({
            icon: "success",
            title: "Book in collection",
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#" style="text-align: center;">Why do I have this issue?</a>'
        }); 
    }
}


async function buy() {
    try {
        const accountId = localStorage.getItem('account_id');
        const response = await axios.post(`http://127.0.0.1:8000/buy_book?account_id=${accountId}`, {
            book_id: selectedBooks
        });
        console.log(response.data.Buy);
        Swal.fire({
            icon: "success",
            title: "Book in collection",
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#" style="text-align: center;">Why do I have this issue?</a>'
        }); 
    }
}