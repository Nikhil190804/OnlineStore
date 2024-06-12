const element1 = document.querySelector("#loginAdmin");
if (element1) {
  element1.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "admin-view.html";
  });
}

const element2 = document.querySelector("#loginCustomer");
if (element2) {
  element2.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "customer-view.html";
  });
}
