async function upload(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const booktype = document.getElementById('booktype').value;
    const pricecoin = document.getElementById('pricecoin').value;
    const intro = document.getElementById('intro').value;
    const content = document.getElementById('content').value;
    const account_id = localStorage.getItem('account_id');
    console.log("Name:", name);
    console.log("Booktype:", booktype);
    console.log("Pricecoin:", pricecoin);
    console.log("Intro:", intro);
    console.log("Content:",content);
    console.log(account_id)
    
    try {
        const response = await axios.post(`http://127.0.0.1:8000/upload_book?writer_id=${account_id}`, {
            "name": name,
            "book_type": booktype,
            "price_coin": pricecoin,
            "intro": intro,
            "content": content
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

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Check if a file is selected
    if (!file) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select a file before uploading.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://127.0.0.1:8000/uploadfile/', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        document.getElementById('response').innerText = `File uploaded successfully. Filename: ${data.filename}`;
        Swal.fire({
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        document.getElementById('response').innerText = 'Error uploading file.';
    }
}
