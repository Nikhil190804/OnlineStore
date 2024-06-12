document
    .getElementById("customer-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email_ID").value;
        const password = document.getElementById("password").value;
        const firstName = document.getElementById("first_name").value;
        const middleName = document.getElementById("middle_name").value;
        const lastName = document.getElementById("last_name").value;
        const dateOfBirth = document.getElementById("date_of_birth").value;
        const age = document.getElementById("age").value;
        const houseNumber = document.getElementById("house_number").value;
        const streetName = document.getElementById("street_name").value;
        const city = document.getElementById("city").value;
        const pincode = document.getElementById("pincode").value;
        const state = document.getElementById("state").value;

        const formData = {
            email: email,
            password: password,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            age: age,
            house_number: houseNumber,
            street_name: streetName,
            city: city,
            pincode: pincode,
            state: state,
        };

        fetch("/sign-up-customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    errorInResponse();
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                if (data === null) {
                    document.getElementById("customer-form").reset();
                } else {
                    alert(
                        "Successfully Registered.....\nNow Sign In With Your Creditionals"
                    );
                    window.location.href = "/customer-view.html";
                }
            })
            .catch((error) => {
                errorInResponse();
            });
    });

function errorInResponse() {
    alert(
        "Customer Already Exists with same Email ID or Input format is wrong!!!!!"
    );
}
