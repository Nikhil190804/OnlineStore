async function submitForm(obj) {
    let data = await fetch("/admin-login-request", {
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
  
  const goBack = document.getElementById("back");
  goBack.addEventListener("click", () => {
    window.location.href = "/index.html";
  });

  const formSubmitted = document.getElementById("login-form");
  formSubmitted.addEventListener("submit", async (event) => {
    event.preventDefault();
    let obj = {};
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    obj["name"] = name;
    obj["password"] = password;
    console.log(obj);
    let result = await submitForm(obj);
    console.log(result);
    if(result===true){
        //change content
        window.location.href="/admin.html"
    }
    else{
        alert("Invalid Credentials!!!!!");
        formSubmitted.reset();
    }
  });