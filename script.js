const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzy-h27uKYF_EASiYEy10IGELrqO_Q9W-0_YUP6jFwCxJFA7nrKPaCtYM6hzvRDcZmMtA/exec';
const tableBody = document.getElementById('tableBody');

function createRow() {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td><input type="date" class="checkDate"></td>
        <td>
            <input type="text" class="productName" list="productSuggestions" placeholder="Tên sản phẩm...">
        </td>
        <td><input type="text" class="lotNo" placeholder="Số lô..."></td>
        <td><input type="number" class="pHValue" step="0.01" placeholder="0.00"></td>
        <td><input type="date" class="issueDate"></td>
        <td><input type="date" class="expDate"></td>
        <td>
            <input type="text" class="idRecipe" list="recipeSuggestions" placeholder="Mã đơn...">
        </td>
        <td><button class="btn-save" onclick="saveRow(this)">Lưu</button></td>
    `;
    tableBody.appendChild(row);
}

async function saveRow(btn) {
    const row = btn.closest('tr');
    const data = {
        checkDate: row.querySelector('.checkDate').value,
        productName: row.querySelector('.productName').value,
        lotNo: row.querySelector('.lotNo').value,
        pHValue: row.querySelector('.pHValue').value,
        issueDate: row.querySelector('.issueDate').value,
        expDate: row.querySelector('.expDate').value,
        idRecipe: row.querySelector('.idRecipe').value // Lấy giá trị từ input text
    };

    // Kiểm tra các trường bắt buộc
    if (!data.checkDate || !data.productName || !data.pHValue || !data.idRecipe) {
        alert("Vui lòng điền đầy đủ thông tin trước khi lưu!");
        return;
    }

    btn.innerText = "Đang gửi...";
    btn.disabled = true;

    try {
        await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        btn.innerText = "Đã lưu ✓";
        btn.style.backgroundColor = "#2d8a4e";
        row.classList.add('saved-row');
        
        // Khóa các ô sau khi lưu thành công để tránh chỉnh sửa nhầm
        row.querySelectorAll('input').forEach(input => input.readOnly = true);
    } catch (error) {
        console.error(error);
        alert("Lỗi kết nối!");
        btn.innerText = "Thử lại";
        btn.disabled = false;
    }
}

// Khởi tạo trang với 5 dòng trống
window.onload = () => { for(let i=0; i<5; i++) createRow(); };
document.getElementById('addRowBtn').addEventListener('click', createRow);
