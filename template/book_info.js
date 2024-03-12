async function addToCart() {
    const queryParams = new URLSearchParams(window.location.search);
    const bookId = queryParams.get('id');
    const accountId = localStorage.getItem('account_id');
    try {
        const response = await axios.post(`http://127.0.0.1:8000/add_cart?reader_id=${accountId}&book_id=${bookId}`);
        console.log(response.data.book)
        result = response.data.book
        console.log(result)
        if (result === "Success") {
            Swal.fire({
                icon: "success",
                title: "Book added to cart",
                showConfirmButton: false,
                timer: 1500
            });
        } else if (result === "Book is already in the cart"){
            Swal.fire({
                icon: "error",
                title: "Book is already in the cart",
                showConfirmButton: false,
                timer: 1500
            });
        } 

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#" style="text-align: center;">Why do I have this issue?</a>'
        });        
    }
}