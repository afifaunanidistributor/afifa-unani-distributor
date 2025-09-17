let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(name, price) {
  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Display cart items
function displayCart() {
    
  let cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p><strong>${item.name}</strong></p>
        <p>Price: ₹${item.price.toFixed(2)}</p>
        <label>Quantity:</label>
        <input type="number" min="1" value="${item.quantity}" 
          onchange="updateQuantity(${index}, this.value)">
        <p>Total: ₹${itemTotal.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
      <hr>
    `;
  });

  document.getElementById("grandTotal").innerText = "Total: ₹" + total.toFixed(2);
}

// Checkout (for now just alert)
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  localStorage.removeItem("cart");
  window.location.href = "checkout.html"; // redirect to checkout page
}


// Clear the whole cart
function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    localStorage.removeItem("cart");
    displayCart();
  }
}

// Update quantity
function updateQuantity(index, newQty) {
  newQty = parseInt(newQty);
  if (newQty <= 0 || isNaN(newQty)) newQty = 1;
  cart[index].quantity = newQty;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCheckout();
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCheckout();
}

// Show items on checkout page
function displayCheckout() {
  let orderSummary = document.getElementById("orderSummary");
  let orderListField = document.getElementById("orderList");
  let orderTotalField = document.getElementById("orderTotal");

  if (!orderSummary) return;

  let total = 0;
  let orderDetails = [];

  orderSummary.innerHTML = "";

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;
    orderDetails.push(`${item.name} (${item.quantity}) = ₹${itemTotal.toFixed(2)}`);

    orderSummary.innerHTML += `
      <div class="checkout-item">
        <p><strong>${item.name}</strong></p>
        <p>Price: ₹${item.price.toFixed(2)}</p>
        <label>Quantity:</label>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
        <p>Total: ₹${itemTotal.toFixed(2)}</p>
        <button type="button" onclick="removeFromCart(${index})">Remove</button>
      </div>
      <hr>
    `;
  });

  document.getElementById("checkoutTotal").innerText = "Total: ₹" + total.toFixed(2);

  if (orderListField) orderListField.value = orderDetails.join("\n");
  if (orderTotalField) orderTotalField.value = "₹" + total.toFixed(2);
}


window.onload = function () {
  displayCart();
  displayCheckout?.(); // only runs if checkout page exists
};
