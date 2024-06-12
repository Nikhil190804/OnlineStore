## Steps to run the project

1. Clone this repo using `https://github.com/Nikhil190804/OnlineStore.git`
2. Open MySQL Workbench or any other equivalent software that can run MySQL scripts
3. Copy the contents of the `DataBase Schema.txt` file and paste it into the MySQL Workbench. This will create a whole MySQL database on your local PC. After this, ensure that your host, user, and password are correct. If not, edit the `server.js` file at line 7 and change accordingly:

```js
const mydb = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "password",
});
```
2. Now move to the repo directory: `OnlineStore/`
3. Open a terminal here
4. Write `npm install`. This will install all the packages from the `package.json` file
5. Now, simply run `node ./server.js`. This will start a server on port 3000 of your local computer, and the site will be opened at this link: `https://localhost:3000`
6. Happy Browsing the items!
