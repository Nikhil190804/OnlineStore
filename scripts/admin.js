let item1 = document.getElementById("showCustomerStats");
      item1.addEventListener("click", async (e) => {
        let response = await fetch("/admin-option1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        });

        if (response.status !== 200) {
          alert("Cant Fetch!!!!!");
        } else {
          // dynamiclly add the data
          let customerData = await response.json();
          console.log(customerData);
          const style = `
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            .card-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                width: 100%;
            }
            .card {
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                width: 300px;
                padding: 20px;
                text-align: center;
            }
            .profile-photo {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: #ccc;
                margin: 0 auto 20px;
            }
            .card h3 {
                margin: 10px 0;
            }
            .card p {
                margin: 5px 0;
            }
            @media (max-width: 768px) {
                .card {
                    width: 100%;
                    max-width: 400px;
                }
            }
        </style>
    `;
          const cards = customerData
            .map(
              (customer) => `
            <div class="card">
                <img src="account.png" alt="" class="profile-photo">
                <h3>${customer.name}</h3>
                <p>UserID: ${customer.customerID}</p>
                <p>Age: ${customer.age}</p>
                <p>Address: ${customer.customer_address}</p>
            </div>
        `
            )
            .join("");
          let newWindow = window.open("", "_blank");
          newWindow.document.title = "Customer Data";
          newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Customer Data</title>
                ${style}
            </head>
            <body>
                <div class="card-container">
                    ${cards}
                </div>
            </body>
            </html>
        `);

          newWindow.document.close();
        }
      });

      let item2 = document.getElementById("topCustomers");
      item2.addEventListener("click", async (e) => {
        let response = await fetch("/admin-option2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        });

        if (response.status !== 200) {
          alert("Cant Fetch!!!!!!");
        } else {
          let customerData = await response.json();
          console.log(customerData);
          const style = `
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            .card-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                width: 100%;
            }
            .card {
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                width: 300px;
                padding: 20px;
                text-align: center;
            }
            .profile-photo {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: #ccc;
                margin: 0 auto 20px;
            }
            .card h3 {
                margin: 10px 0;
            }
            .card p {
                margin: 5px 0;
            }
            @media (max-width: 768px) {
                .card {
                    width: 100%;
                    max-width: 400px;
                }
            }
        </style>
    `;

          const cards = customerData
            .map(
              (customer) => `
            <div class="card">
                <img src="account.png" alt="" class="profile-photo">
                <h3>${customer.customer_name}</h3>
                <p>UserID: ${customer.userID}</p>
                <p>Total Amount: ${customer.total_transaction_amount}</p>
            </div>
        `
            )
            .join("");

          let newWindow = window.open("", "_blank");
          newWindow.document.title = "Customer Data";
          newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Customer Data</title>
                ${style}
            </head>
            <body>
                <div class="card-container">
                    ${cards}
                </div>
            </body>
            </html>
        `);
        }
      });

      let item3 = document.getElementById("addCoupanbtn");
      item3.addEventListener("click", (e) => {
        document.getElementById("popupOverlay").style.display = "flex";
      });

      document
        .getElementById("closePopupBtn")
        .addEventListener("click", function () {
          document.getElementById("popupOverlay").style.display = "none";
        });

      window.onclick =  (event) =>{
        if (event.target == document.getElementById("popupOverlay")) {
          document.getElementById("popupOverlay").style.display = "none";
        }
      };

      async function returnCoupanStatus(obj){
        let data = await fetch("/admin-option3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        if(data.status===200){
            return true;
        }
        else{
            return false;
        }
      }

      const coupanForm = document.getElementById("addCoupan");
      coupanForm.addEventListener("submit",async (event)=>{
        let obj={};
        event.preventDefault();
        let coupanCode = document.getElementById("couponCode").value;
        let discount = document.getElementById("discountPercentage").value;
        let expiry = document.getElementById("expiryDate").value;
        let description = document.getElementById("description").value;
        obj["coupanCode"]=coupanCode;
        obj["discount"]=discount;
        obj["expiry"]=expiry;
        obj["description"]=description
        console.log(description);
       let result = await returnCoupanStatus(obj);
        
        if(result===true){
          const click = new Event("click");
          document.getElementById("closePopupBtn").dispatchEvent(click)
          coupanForm.reset();
          alert("Coupan Added Successfully.....")
            //change content
            //document.getElementById("popup").dispatchEvent("click")
            //window.location.href="/admin.html"
          }
          else{

            alert("Database Refused to Add!!!!!");
            coupanForm.reset();
        }

      })
