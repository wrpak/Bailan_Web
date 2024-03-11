const account_id = localStorage.getItem('account_id');

async function fetchCartData() {
    try {
        const response = await axios.get('/show_cart?reader_id=${account_id}'); // แทนที่ 123 ด้วย ID ของผู้ใช้จริง
        const cartItems = response.data["reader_cart"]; // สมมติว่า API ส่งข้อมูลในรูปแบบนี้

        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = ''; // เคลียร์รายการสินค้าเก่าทิ้งก่อน

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('mb-3', 'p-3', 'border', 'border-primary');
            itemElement.innerHTML = `
                <h5>${item.book_name}</h5>
                <p>Price: ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <!-- สามารถเพิ่มรายละเอียดเพิ่มเติมได้ตามต้องการ -->
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}

// เรียกใช้งานฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
window.onload = function () {
    const account_id = getLoggedInUserId(); // สมมติว่ามีฟังก์ชัน getLoggedInUserId() ที่สร้างขึ้นเพื่อรับค่า account_id ของผู้ใช้ที่ล็อกอิน
    fetchCartData(account_id);
}