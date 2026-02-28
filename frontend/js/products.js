const products = [
  { id: 1, name: "T-Shirt", price: 499, image: "images/fashion.jpg" },
  { id: 2, name: "Headphones", price: 1999, image: "images/electronics.jpg" },
  { id: 3, name: "Smartphone", price: 14999, image: "images/mobiles.jpg" },
  { id: 4, name: "Groceries Pack", price: 999, image: "images/groceries.jpg" },
  { id: 5, name: "Cricket Kit", price: 2999, image: "images/sports.jpg" }
];

let cart = JSON.parse(localStorage.getItem("shopez-cart")) || [];

const productList = document.getElementById("product-list");

function displayProducts() {
  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("shopez-cart", JSON.stringify(cart));
  alert("Added to cart!");
}

displayProducts();