function show_order_pop_up(btn, productID, price, name, desc, flag) {

  if (flag) {
    let element = btn.previousElementSibling;
    let prod_quantity = element.value;
    const modal = document.getElementById("orderModal");
    modal.style.display = "flex";
    document.getElementById("modalProductId").innerText = productID;
    document.getElementById("modalProductName").innerText = name;
    document.getElementById("modalProductDescription").innerText =desc;
    document.getElementById("modalProductPrice").innerText = price;
    document.getElementById("modalProductQuantity").innerText = prod_quantity;
  } else {
    let pd = document.getElementById("modalProductQuantity").innerText;
    let price = document.getElementById("modalProductPrice").innerText;
    let productID = document.getElementById("modalProductId").innerText;
    handle(pd, productID, price);
  }
}

async function handle(quantity, productID, price) {
  let prod_quantity = parseInt(quantity);
  let customer_id = document.getElementById("customer-id").textContent;
  console.log(customer_id);
  let obj = {
    product_id: productID,
    price: price,
    customer_id: customer_id,
    quantity: prod_quantity,
  };
  try {
    let response = await fetch("/product-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log(response.status);
    if (response.status == 200) {
      alert("Successfully Ordered.....");
    } else {
      alert("Failed to order!!!!!");
    }
  } catch (err) {
    alert("Failed to order!!!!!");
    console.log(err);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const namee = urlParams.get("name");

document.getElementById("customer-name").innerHTML = namee;
document.getElementById("customer-id").innerHTML = id;
document.addEventListener("DOMContentLoaded", async () => {
  let response = await fetch("/product-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: "",
  });
  let data = await response.json();
  const productsContainer = document.getElementById("prod");

  data.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "card";
    let d = product.description;
    let n = product.name;
    console.log(product.description);
    productCard.innerHTML = `
            <img src="https://via.placeholder.com/150" alt="Product Image">
            <h3>Product ID: ${product.productID}</h3>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <input type="number" min="1" max="3" value="1">
            <button onclick = "show_order_pop_up(this,${product.productID},${product.price},'${n}','${d}',true)">Order Now</button>
        `;
    productsContainer.appendChild(productCard);
  });

  console.log(data);
});

document.getElementById("logout-btn").addEventListener("click", () => {
  window.location.href = "/index.html";
});

function closeModal() {
  const modal = document.getElementById("orderModal");
  modal.style.display = "none";
}

function confirmOrder() {
  show_order_pop_up(null, null, null, null, null, false);
  closeModal();
}

window.onclick = function (event) {
  const modal = document.getElementById("orderModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
