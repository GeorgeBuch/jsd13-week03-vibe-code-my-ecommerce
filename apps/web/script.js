const form = document.getElementById('loginForm');
const message = document.getElementById('message');
const productsEl = document.getElementById('productGrid');

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();

    if (!products.length) {
      productsEl.innerHTML = '<article class="product-card"><p class="muted-light">ยังไม่มีสินค้า กรุณาเพิ่มข้อมูลในคอลเลกชัน MongoDB <code>products</code></p></article>';
      return;
    }

    productsEl.innerHTML = products.map((product) => `
      <article class="product-card">
        <div class="pill-tag">${product.category || 'สินค้า'}</div>
        <h3>${product.name}</h3>
        <p class="muted-light">แสดงจากคอลเลกชัน MongoDB <code>products</code></p>
        <div class="product-footer">
          <span>สต็อก ${product.stock ?? 0}</span>
          <strong>THB ${product.price}</strong>
        </div>
      </article>
    `).join('');
  } catch {
    productsEl.innerHTML = '<article class="product-card"><p class="muted-light">ไม่สามารถโหลดสินค้าจาก backend ได้</p></article>';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = 'กำลังเข้าสู่ระบบ...';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
    }

    message.textContent = `ยินดีต้อนรับ ${data.user.fullname || data.user.email}`;
  } catch (error) {
    message.textContent = error.message;
  }
});

loadProducts();
