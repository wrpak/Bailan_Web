async function transfer(event) {
    event.preventDefault();
    const coin = document.getElementById('coin').value;
    const account_id = localStorage.getItem('account_id');
    console.log("Coin:", coin);
    console.log(account_id)
    
    try {
        const response = await axios.post(`http://127.0.0.1:8000/transfer?writer_id=${account_id}`, {
            "coin": coin
        });
        console.log("Response:", response);
        Swal.fire({
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }
}