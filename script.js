const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzy-h27uKYF_EASiYEy10IGELrqO_Q9W-0_YUP6jFwCxJFA7nrKPaCtYM6hzvRDcZmMtA/exec';
function createRow() {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="date" class="checkDate"></td>
        <td><input type="text" class="productName" list="productSuggestions" placeholder="Tên SP..."></td>
        <td><input type="text" class="lotNo" placeholder="Lô..."></td>
        <td><input type="number" class="pHValue" step="0.01"></td>
        <td><input type="date" class="issueDate"></td>
        <td><input type="date" class="expDate"></td>
        <td><input type="text" class="idRecipe" list="recipeSuggestions" placeholder="Mã đơn..."></td>
        <td><button class="btn-save" onclick="saveRow(this)">Lưu</button></td>
    `;
    document.getElementById('tableBody').appendChild(row);
}

async function saveRow(btn) {
    const row = btn.closest('tr');
    const inputs = row.querySelectorAll('input');
    const data = {
        checkDate: row.querySelector('.checkDate').value,
        productName: row.querySelector('.productName').value,
        lotNo: row.querySelector('.lotNo').value,
        pHValue: row.querySelector('.pHValue').value,
        issueDate: row.querySelector('.issueDate').value,
        expDate: row.querySelector('.expDate').value,
        idRecipe: row.querySelector('.idRecipe').value
    };

    if (!data.checkDate || !data.productName || !data.pHValue) {
        alert("Thiếu thông tin quan trọng!"); return;
    }

    btn.innerText = "...";
    btn.disabled = true;

    try {
        await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data)
        });
        
        // Hiệu ứng hoàn tất
        btn.innerText = "OK ✓";
        btn.style.background = "#2d8a4e";
        row.style.background = "#f0fff4";
        inputs.forEach(i => i.readOnly = true);

        // TỰ ĐỘNG THÊM DÒNG MỚI KHI LƯU XONG
        createRow();
        
    } catch (e) {
        alert("Lỗi!");
        btn.disabled = false;
        btn.innerText = "Lưu";
    }
}

window.onload = () => createRow(); // Bắt đầu với 1 dòng
document.getElementById('addRowBtn').addEventListener('click', createRow);
