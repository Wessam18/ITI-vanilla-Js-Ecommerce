// ================= PROTECT PAGE =================
if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "login.html";
}

// ================= PRODUCTS =================
const products = [
  { id: 1, name: "BMW X6", price: 90000, image: "assets/cart1.jpg" },
  { id: 2, name: "Mercedes C-Class", price: 75000, image: "assets/cart2.jpg" },
  { id: 3, name: "Audi R8", price: 150000, image: "assets/cart3.jpg" },
  { id: 4, name: "Toyota Corolla", price: 25000, image: "assets/cart4.jpg" },
  {
    id: 5,
    name: "Range Rover Sport",
    price: 110000,
    image: "assets/cart5.jpg",
  },
  { id: 6, name: "Porsche Cayenne", price: 130000, image: "assets/cart6.jpg" },
  { id: 7, name: "Chevrolet Camaro", price: 68000, image: "assets/cart7.jpg" },
  { id: 8, name: "Ford Mustang GT", price: 72000, image: "assets/cart8.jpg" },
  { id: 9, name: "Hyundai Tucson", price: 32000, image: "assets/cart9.jpg" },
  { id: 10, name: "Nissan Patrol", price: 95000, image: "assets/cart10.jpg" },
  { id: 11, name: "Lexus RX 350", price: 87000, image: "assets/cart11.jpg" },
  { id: 12, name: "Kia Sportage", price: 28000, image: "assets/cart12.jpg" },
  {
    id: 13,
    name: "Jeep Grand Cherokee",
    price: 98000,
    image: "assets/cart13.jpg",
  },
  { id: 14, name: "Tesla Model S", price: 140000, image: "assets/cart14.jpg" },
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
    <div class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 flex flex-col">

      <!-- Image -->
<div class="relative overflow-hidden h-56">    
    <img src="${product.image}" 
             class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
             alt="${product.name}">
      </div>

      <!-- Content -->
      <div class="p-6 flex flex-col flex-grow">

        <h4 class="text-xl font-bold text-gray-800 mb-2">
          ${product.name}
        </h4>

        <p class="text-gray-500 mb-4 text-sm">
          Luxury • Automatic • 2025 Model
        </p>

        <div class="mt-auto flex items-center justify-between">

          <span class="text-lg font-semibold text-[#223A5E]">
            $${product.price.toLocaleString()}
          </span>

          <button onclick='addToCart(${JSON.stringify(product)})'
            class="bg-[#223A5E] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Add
          </button>

        </div>
      </div>

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

  showToast(product.name + " added to cart");
} // ================= SIDE CART LOGIC =================

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
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItemsDiv.innerHTML += `
  <li class="flex py-6 space-x-4">
    
    <!-- Image -->
    <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
      <img src="${item.image}"
        class="h-full w-full object-cover">
    </div>

    <!-- Info -->
    <div class="flex flex-1 flex-col">
      
      <div class="flex justify-between text-base font-medium text-gray-900">
        <h3>${item.name}</h3>
        <p>$${itemTotal.toLocaleString()}</p>
      </div>

      <p class="mt-1 text-sm text-gray-500">
        $${item.price.toLocaleString()} × ${item.quantity}
      </p>

      <div class="flex items-center justify-between mt-3">
        
        <div class="flex items-center space-x-2">
          <button onclick="decreaseQty(${index})"
            class="px-2 bg-gray-200 rounded hover:bg-gray-300">-</button>

          <span>${item.quantity}</span>

          <button onclick="increaseQty(${index})"
            class="px-2 bg-gray-200 rounded hover:bg-gray-300">+</button>
        </div>
        <button onclick="removeItem(${index})"
          class="text-red-500 hover:text-red-600 text-sm">
          Remove
        </button>

      </div>
    </div>
  </li>
`;
  });

  totalSpan.innerText = total;
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
      renderCart();
    }
  });
});

updateCartCount();

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;

  toast.classList.remove("opacity-0", "translate-x-10");
  toast.classList.add("opacity-100", "translate-x-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-x-0");
    toast.classList.add("opacity-0", "translate-x-10");
  }, 2000);
}
