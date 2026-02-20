// ================= PROTECT PAGE =================
if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "login.html";
}

// ================= PRODUCTS =================
const products = [
  { id: 1, name: "BMW X6", price: 90000 },
  { id: 2, name: "Mercedes C-Class", price: 75000 },
  { id: 3, name: "Audi R8", price: 150000 },
  { id: 4, name: "Toyota Corolla", price: 25000 },
];

const container = document.getElementById("productsContainer");
const cartCount = document.getElementById("cartCount");

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalItems = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  cartCount.innerText = totalItems;
}
products.forEach((product) => {
  container.innerHTML += `
    <div class="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
      <h4 class="text-lg font-bold mb-2">${product.name}</h4>
      <p class="text-[#223A5E] font-semibold text-lg mb-4">$${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'
        class="bg-[#223A5E] text-white px-4 py-2 rounded hover:bg-[#1b2f4b] transition w-full">
        Add to Cart
      </button>
    </div>
  `;
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}
// ================= SIDE CART LOGIC =================

let cartItemsDiv, totalSpan;

document.addEventListener("DOMContentLoaded", () => {
  cartDrawer = document.getElementById("cartDrawer");
  drawerPanel = document.getElementById("drawerPanel");
  cartItemsDiv = document.getElementById("cartItems");
  totalSpan = document.getElementById("total");

  updateCartCount();
});

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity; // السعر لكل عنصر مضروب في الكمية
    total += itemTotal;

    cartItemsDiv.innerHTML += `
      <li class="flex py-6">
        <div class="ml-4 flex flex-1 flex-col">
          <div class="flex justify-between text-base font-medium text-gray-900">
            <h3>${item.name}</h3>
            <p class="ml-4">$${itemTotal}</p> <!-- السعر مضروب في الكمية -->
          </div>

          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center space-x-2">
              <button onclick="decreaseQty(${index})"
                class="px-2 bg-gray-200 rounded">-</button>

              <span>${item.quantity}</span>

              <button onclick="increaseQty(${index})"
                class="px-2 bg-gray-200 rounded">+</button>
            </div>

            <button onclick="removeItem(${index})"
              class="text-indigo-600 hover:text-indigo-500">
              Remove
            </button>
          </div>
        </div>
      </li>
    `;
  });

  totalSpan.innerText = total; // التوتال النهائي
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  cartItemsDiv = document.getElementById("cartItems");
  totalSpan = document.getElementById("total");

  updateCartCount();

  // --- هنا نضيف listener لفتح الـ Drawer ---
  const drawer = document.getElementById("drawer");
  drawer.addEventListener("toggle", () => {
    if (drawer.open) {
      renderCart(); // أول ما الدروار يفتح، نرندر الكارت من localStorage
    }
  });
});

updateCartCount();
