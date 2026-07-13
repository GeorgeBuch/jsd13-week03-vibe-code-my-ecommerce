const form = document.getElementById('loginForm');
const message = document.getElementById('loginMessage');
const productGrid = document.getElementById('productGrid');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    message.textContent = 'Please fill in both email and password.';
    message.style.color = '#fca5a5';
    return;
  }

  message.textContent = 'Signing in...';
  message.style.color = '#cbd5e1';

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message || 'Login failed.';
      message.style.color = '#fca5a5';
      return;
    }

    message.textContent = `Welcome back, ${data.user.fullname || data.user.email}.`;
    message.style.color = '#86efac';
    form.reset();
  } catch (error) {
    message.textContent = 'Cannot reach backend server.';
    message.style.color = '#fca5a5';
  }
});

function renderProducts(products) {
  if (!productGrid) {
    return;
  }

  if (!products.length) {
    productGrid.innerHTML = '<p class="empty-state">No products found in the database.</p>';
    return;
  }

  productGrid.innerHTML = products
    .map((product) => `
      <article class="product-card">
        <div class="product-tag">${product.category || 'Product'}</div>
        <h3>${product.name}</h3>
        <p>Available in MongoDB collection <code>products</code>.</p>
        <div class="product-footer">
          <span>Stock ${product.stock ?? 0}</span>
          <strong>THB ${product.price}</strong>
        </div>
      </article>
    `)
    .join('');
}

async function loadProducts() {
  if (!productGrid) {
    return;
  }

  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to load products');
    }

    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    productGrid.innerHTML = '<p class="empty-state">Unable to load products from the backend.</p>';
  }
}

loadProducts();
