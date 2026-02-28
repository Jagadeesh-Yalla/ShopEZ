document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("shopez-cart")) || [];

  const cartList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");
  const clearCartButton = document.getElementById("clear-cart-btn");

  function updateCartDisplay() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${item.name}</span>
        <div>
          <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
        </div>
        <span>₹${item.price * item.quantity}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      cartList.appendChild(li);
      total += item.price * item.quantity;
    });

    totalPriceElement.textContent = "Total: ₹" + total;
    // Disable / enable checkout button
    checkoutButton.disabled = cart.length === 0;
    checkoutButton.style.opacity = cart.length === 0 ? "0.5" : "1";
    checkoutButton.style.cursor = cart.length === 0 ? "not-allowed" : "pointer";
    localStorage.setItem("shopez-cart", JSON.stringify(cart));
  }

  document.addEventListener("click", (e) => {

    if (e.target.classList.contains("add-to-cart-btn")) {
      const card = e.target.closest(".product-card");
      const name = card.querySelector("h3").innerText;
      const price = parseInt(card.querySelector(".price").innerText.replace("₹", ""));

      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      updateCartDisplay();
    }

    if (e.target.classList.contains("qty-btn")) {
      const index = e.target.dataset.index;
      const action = e.target.dataset.action;

      if (action === "increase") cart[index].quantity++;
      if (action === "decrease") {
        cart[index].quantity--;
        if (cart[index].quantity === 0) cart.splice(index, 1);
      }

      updateCartDisplay();
    }

    if (e.target.classList.contains("remove-btn")) {
      cart.splice(e.target.dataset.index, 1);
      updateCartDisplay();
    }
  });

  checkoutButton.addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cart)
      
    });

    if(!response.ok) {
      throw new Error(data.message || "checkout failed");
    }

    alert(data.message);

    cart = [];
    updateCartDisplay();
    localStorage.removeItem("shopez-cart");

  } catch (error) {
    alert("Checkout failed. Please try again.");
    console.error(error);
  }
});
    clearCartButton.addEventListener("click", () => {
    if (cart.length === 0) return;

    if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    localStorage.removeItem("shopez-cart");
    updateCartDisplay();
  }
});

  updateCartDisplay();
});