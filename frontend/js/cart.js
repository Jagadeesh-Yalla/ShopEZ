const cartItems = JSON.parse(localStorage.getItem("shopez-cart")) || [];

const cartContainer = document.getElementById("cart-container");
const totalContainer = document.getElementById("cart-total");

function displayCart() {
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<h3>Your cart is empty</h3>";
    totalContainer.innerHTML = "";
    return;
  }

  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" width="80">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <p>Qty: ${item.quantity}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartContainer.appendChild(div);
  });

  totalContainer.innerHTML = `<h2>Total: ₹${total}</h2>`;
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("shopez-cart", JSON.stringify(cartItems));
  displayCart();
}

displayCart();