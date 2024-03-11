// เพิ่ม Event Listener สำหรับปุ่ม "Add to Cart"
document.getElementById('addToCartButton').addEventListener('click', addToCart);

// ฟังก์ชันที่เรียกเมื่อผู้ใช้คลิกปุ่ม "Add to Cart"
async function addToCart() {
    // ดึงข้อมูล account_id จาก localStorage
    const account_id = localStorage.getItem('account_id');

    try {
        // ส่งคำขอ HTTP ไปยังเซิร์ฟเวอร์เพื่อเพิ่มหนังสือลงในตะกร้าของผู้ใช้
        const response = await axios.get(`/add_cart?reader_id=${account_id}&book_id=1`);

        // ตรวจสอบสถานะการทำงานของคำขอ
        if (response.status === 200) {
            alert('Book added to cart successfully!');
            // สามารถเรียกฟังก์ชัน fetchCartData() เพื่ออัปเดตตะกร้าของผู้ใช้หลังจากเพิ่มหนังสือ
            // หรือทำการอัปเดต DOM โดยตรงเพื่อแสดงรายการที่อัปเดตล่าสุดของตะกร้า
        } else {
            alert('Failed to add book to cart. Please try again.');
        }
    } catch (error) {
        console.error('Error adding book to cart:', error);
        alert('An error occurred while adding book to cart. Please try again later.');
    }
}