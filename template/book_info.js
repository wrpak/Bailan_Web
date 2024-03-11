async function addToCart() {
    const queryParams = new URLSearchParams(window.location.search);
    const bookId = queryParams.get('id');
    const accountId = localStorage.getItem('account_id');
    try {
        const response = await axios.post(`http://localhost:8000/add_cart?reader_id=${account_id}&book_id=${bookId}`);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Book added to cart",
            showConfirmButton: false,
            timer: 1500
        });

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}

