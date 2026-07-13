fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    console.log(data); // ข้อมูลจาก Database จะมาโผล่ตรงนี้
    // คุณสามารถนำข้อมูลไปยัดใส่ HTML ได้ที่นี่
  });