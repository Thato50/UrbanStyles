let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  document.querySelectorAll('#cart-count').forEach(c => c.textContent = cart.reduce((a, b) => a + b.qty, 0));
}
updateCartCount();

function addToCart(id) {
  const item = PRODUCTS.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert("✅ Added to cart!");
}

// --- Home Page ---
if (document.getElementById("featured-products")) {
  const featured = PRODUCTS.slice(0, 3);
  const container = document.getElementById("featured-products");
  featured.forEach(p => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("product-img");
    imgDiv.style.backgroundImage = `url('${p.image}')`;

    productDiv.appendChild(imgDiv);
    productDiv.innerHTML += `
      <h3>${p.name}</h3>
      <p>R${p.price}</p>
      <a href="product.html?id=${p.id}" class="btn">View</a>
    `;
    container.appendChild(productDiv);
  });
}

// --- Products Page ---
if (document.getElementById("product-list")) {
  const container = document.getElementById("product-list");
  const searchBox = document.getElementById("searchBox");
  const categoryFilter = document.getElementById("categoryFilter");

  function renderProducts(list) {
    container.innerHTML = "";
    list.forEach(p => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const imgDiv = document.createElement("div");
      imgDiv.classList.add("product-img");
      imgDiv.style.backgroundImage = `url('${p.image}')`;

      productDiv.appendChild(imgDiv);
      productDiv.innerHTML += `
        <h3>${p.name}</h3>
        <p>R${p.price}</p>
        <button class="btn" onclick="addToCart('${p.id}')">Add to Cart</button>
        <a href="product.html?id=${p.id}" class="btn">Details</a>
      `;
      container.appendChild(productDiv);
    });
  }

  renderProducts(PRODUCTS);

  searchBox.addEventListener("input", () => {
    const q = searchBox.value.toLowerCase();
    const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(q));
    renderProducts(filtered);
  });

  categoryFilter.addEventListener("change", () => {
    const cat = categoryFilter.value;
    renderProducts(cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat));
  });
}

// --- Product Details Page ---
if (window.location.pathname.includes("product.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = PRODUCTS.find(p => p.id === id);
  document.getElementById("product-details").innerHTML = `
    <div class="product-details-box">
      <div class="product-img" style="background-image: url('${p.image}'); height: 300px;"></div>
      <h2>${p.name}</h2>
      <p>R${p.price}</p>
      <p>${p.description}</p>
      <button class="btn" onclick="addToCart('${p.id}')">Add to Cart</button>
    </div>
  `;
}

// --- Cart Page ---
if (document.getElementById("cart-items")) {
  const container = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");

  function renderCart() {
    container.innerHTML = "";
    let total = 0;
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalDisplay.innerText = "";
      return;
    }
    cart.forEach((p, i) => {
      total += p.price * p.qty;

      const cartDiv = document.createElement("div");
      cartDiv.classList.add("cart-item");

      const imgDiv = document.createElement("div");
      imgDiv.classList.add("product-img");
      imgDiv.style.backgroundImage = `url('${p.image}')`;
      imgDiv.style.height = "100px"; // fixed height for cart
      imgDiv.style.width = "100px";
      imgDiv.style.backgroundSize = "contain";
      imgDiv.style.backgroundPosition = "center";
      imgDiv.style.backgroundRepeat = "no-repeat";

      cartDiv.appendChild(imgDiv);
      cartDiv.innerHTML += `
        <h3>${p.name}</h3>
        <input type="number" value="${p.qty}" min="1" onchange="updateQty(${i}, this.value)">
        <p>R${p.price * p.qty}</p>
        <button onclick="removeItem(${i})" class="btn">Remove</button>
      `;
      container.appendChild(cartDiv);
    });
    totalDisplay.innerText = "Total: R" + total;
  }

  renderCart();

  window.updateQty = (index, val) => {
    cart[index].qty = parseInt(val);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };

  window.removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };
}

// --- Checkout Page ---
if (document.getElementById("checkoutForm")) {
  document.getElementById("checkoutForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("✅ Purchase completed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
}
