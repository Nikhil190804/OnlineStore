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