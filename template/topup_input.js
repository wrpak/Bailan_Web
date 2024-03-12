
async function top_up(event) {
    event.preventDefault();
    const money = document.getElementById('money').value;
    const account_id = localStorage.getItem('account_id');
    const chanel = document.getElementById('chanel').value;
    console.log("Money:", money);
    console.log("Chanel:", chanel);

    try {
        const response = await axios.post(`http://127.0.0.1:8000/top_up?account_id=${account_id}&chanel_id=${chanel}`, {
            "coin": money,
        });
        console.log("Response:", response);
        Swal.fire({
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500
        });
        // Redirect to login page or handle success
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }
}
document.getElementById('topUpButton').addEventListener('click', top_up);
