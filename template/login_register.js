// Check if the register form exists on the current page
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Get the selected role
        const role = document.querySelector('input[name="role"]:checked').value;

        try {
            const response = await axios.post(`http://127.0.0.1:8000/register_${role}`, {
                account_name: username,
                password: password,
                role: role
            });

            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            // Redirect to login page or handle success
            window.location.href = 'login.html'; // Redirect to the login page after successful registration
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                account_name: username,
                password: password
            });
            localStorage.setItem('account_type', response.data.account_type);
            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            const account_id = response.data.account_id;
            localStorage.setItem('account_id', account_id);
            // Redirect to dashboard or handle success
            window.location.href = 'index.html';
        } catch (error) {
            Swal.fire({
                icon: "question",
                title: "Account not found.",
                text: "Do you want to register?",
                footer: '<a href="register.html">Register now</a>'
            });
        }
    });
}
