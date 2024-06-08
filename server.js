import express, { response } from "express";
import mysql from "mysql";

const app = express();
const port = 3000;

const mydb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});

mydb.connect();
mydb.query("use nnv;");

app.use(express.static("public"));
app.use("/styles", express.static("styles"));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/admin-login-request", (req, res) => {
  console.log("Admin Login request.....");

  //preform validation of data
  let name = req.body.name;
  let password = req.body.password;
  let isValid = false;
  mydb.query("Select * from Admin", (err, data) => {
    if (err) {
      console.log("Invalid Data");
    } else {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row.username === name && row.password === password) {
          console.log("Valid data ");
          isValid = true;
          res.status(200).json({ success: true, message: "Login Success" });
          break;
        }
      }
    }
    if (isValid === false) {
      res.status(401).json({ success: false, message: "Login Failed" });
    }
  });
});



app.post("/admin-option1", (req, res) => {
  mydb.query("SELECT userID AS customerID, CONCAT(first_name, ' ', COALESCE(middle_name, ''), ' ', last_name) AS name, CONCAT(house_number, ', ', street_name, ', ', city, ', ', state, ' - ', pincode) AS customer_address, age, MAX(ph.phone_number) AS primary_phone_number, email_ID AS email FROM Customer JOIN phone_number_customers ph ON Customer.phoneID = ph.phoneID GROUP BY customerID;", (err, data) => {
    if (err) {
      console.log("Error has Occureed during the Database Connection!!!!!!");
      res.status(400);
    } else {
      let json_data = JSON.stringify(data);
      res.status(200).send(json_data);
    }
  });
  console.log("Admin option 1 done");
});



app.post("/admin-option2", (req, res) => {
  mydb.query("SELECT c.userID, CONCAT(c.first_name, ' ', COALESCE(c.middle_name, ''), ' ', c.last_name) AS customer_name, SUM(t.amount) AS total_transaction_amount FROM Customer c JOIN CustomersTransactions ct ON c.userID = ct.userID JOIN Transactions t ON ct.transactionID = t.transactionID GROUP BY c.userID ORDER BY total_transaction_amount DESC LIMIT 3;", (err, data) => {
    if (err) {
      console.log("Error has Occureed during the Database Connection!!!!!!");
      res.status(400);
    } else {
      let json_data = JSON.stringify(data);
      res.status(200).send(json_data);
    }
  });
  console.log("Admin option 2 done");
});



app.post("/admin-option3", (req, res) => {
  mydb.query("Select Max(coupanID) from coupans;", (err, data) => {
    if (err) {
      console.log("Error has Occureed during the Database Connection!!!!!!");
      res.status(400);
    } else {
      let json_data = JSON.stringify(data);
      let coupanID = json_data[json_data.length-3]
      coupanID=parseInt(coupanID)
      let coupancode = req.body.coupanCode
      let discount = req.body.discount
      let expiry = req.body.expiry
      let desc = req.body.description
      console.log(coupanID,coupancode,discount,expiry,desc);
      const sqlquery = "INSERT INTO Coupans VALUES (1,?, ?,?,?,?)";
      const values = [coupanID+1,expiry,discount,desc,coupancode];
      mydb.query(sqlquery,values,(err,result)=>{
        if(err){
          console.log(err);
          res.status(401).json({ success: false, message: "Failed to insert values" });
        }
        else{
          console.log("Coupan Added .....");
          res.status(200).json({ success: true, message: "Success....." });
        }
      });
    }
  });
  console.log("Admin option 3 done");
});





app.post("/customer-sign-in", (req, res) => {
  console.log("Customer Login request.....");

  //preform validation of data
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  console.log(password);
  let isValid = false;
  mydb.query(`Select * from Customer where email_ID="${email}" and password = "${password}"`, (err, data) => {
    if (err) {
      console.log("Invalid Data");
    } else {
      if(data.length >=1){
        isValid = true;
        res.status(200).json({ success: true, message: "Login Success" });
      }
    }
    if (isValid === false) {
      res.status(401).json({ success: false, message: "Login Failed" });
    }
  });
});




app.post("/sign-up-customer", (req, res) => {
  console.log("Customer Sign Up request...");
  const email = req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const date_of_birth = req.body.date_of_birth;
  const age = parseInt(req.body.age);
  const house_number =parseInt( req.body.house_number);
  const street_name = req.body.street_name;
  const city = req.body.city;
  const pincode = parseInt(req.body.pincode);
  const state = req.body.state;
  let flag = false;
  let userID=null;
  mydb.query("select * from customer ", (err, data) => {
    if (err) {
      console.log("Error has Occureed during the Database Connection!!!!!!");
    } else {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row.email_ID === email && row.password === password) {
          console.log("Present Already ");
          res.status(401).json({ success: false, message: "Already Exists" });
          flag = true;
          break;
        }
      }
      if (flag === false) {
        userID=data[data.length-1].userID;
        console.log("valid h");
        const sqlQuery = "INSERT INTO CUSTOMER VALUES (1, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const values = [userID+1,password,first_name,middle_name,last_name,email,userID+1,date_of_birth,age,house_number,street_name,city,pincode,state];
        mydb.query(sqlQuery,values,(err,result)=>{
          if(err){
            console.log(err);
            res.status(401).json({ success: false, message: "Already Exists" });
          }
          else{
            console.log("done insertion");
            res.status(200).json({ success: false, message: "New Customer" });
          }
        });
      }
    }
  });
});
