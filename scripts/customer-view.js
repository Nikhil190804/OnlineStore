const signUpButton = document.getElementById("signUp");
      const signInButton = document.getElementById("signIn");
      const container = document.getElementById("container");

      signUpButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });

      const userSignIn = document.getElementById("signincustomer");
      userSignIn.addEventListener("click", async () => {
        let obj = {};
        let username = document.getElementById("username").value;
        let pwd = document.getElementById("pwd").value;
        obj["email"] = username;
        obj["password"] = pwd;
        console.log(obj);
        let response =await fetch("/customer-sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        if(response.status==200){
          let data =  await response.json();
          console.log(data);
          alert("sign in success")
          window.location.href = `/customer-login.html?id=${data.id}&name=${data.name}`;
        }
        else{
          alert("failed!")
          document.getElementById("form-sign-in").reset();
        }
      });

      const userSignUp = document.getElementById("signupcustomer");
      userSignUp.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "/customer-signup.html";
      });