// LOGIC //

var mysql = require("mysql");
var inquirer = require("inquirer");

// CONNECT TO SQL
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    console.log("\n=========================== \n Items currently on SALE!!!! \n===========================")
    itemDisplay();
});
  
// First display all of the items available for sale
function itemDisplay() {
    var query = "SELECT item_id, product_name, price FROM products";
    // console.log(query);
    connection.query(query, function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      // connection.end();
      runSearch();
    });
};
  
function runSearch() {
    inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "\nEnter product Id and the number of units that you like to buy.",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
      })
      .then(function(answer) {
        // console.log(answer);
        productSearch();
      });
};

function productSearch() {
  inquirer
    .prompt({
      name: "item_id",
      type: "input",
      message: "Which product would you like?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    })
    .then(function(answer) {
      var query = "SELECT item_id, product_name, price FROM products WHERE ?;";
      var userID = answer.item_id; 
      connection.query(query, { item_id: answer.item_id }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("\nItem_ID: " + res[i].item_id + 
          " || Product_Name: " + res[i].product_name + 
          " || Price: " + res[i].price + "\n");
        };
        unitSearch(userID);
      });
    });
};

function unitSearch(userID) {
  // console.log("this is the id passed" + userID)
  inquirer
    .prompt({
      name: "stock_quantity",
      type: "input",
      message: "How many units would you like?"
    })
    .then(function(answer){
      // console.log("test");
      var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id=" + userID;
      var stockDeduct = answer.stock_quantity;
      connection.query(query, { stock_quantity: answer.stock_quantity }, function(err, res) {
        // console.log("this is the res");
        console.log(res);
        console.log("\nUnits Available: " + res[0].stock_quantity);
        var priceCalc = res[0].price;
        var storeQuant = res[0].stock_quantity;
        // console.log(storeQuant + " " + priceCalc);
        calculationFormula(priceCalc,storeQuant,stockDeduct, userID);
      });
    });
};

function calculationFormula(priceCalc,storeQuant, stockDeduct, userID) {
  
  // calculation for customer price for the items and stock deduction
  var storeItemPrice = priceCalc;
  var storeQuantCalc = storeQuant;
  var stockDeductCalc = stockDeduct;

  var purchasePrice = storeItemPrice * stockDeductCalc;
  var quantityLeft = storeQuantCalc - stockDeductCalc;
  console.log("Your total purchase price: $" + purchasePrice);
  console.log("Units left: " + quantityLeft + "\n");
  console.log("***********************\nCONGRATULATIONS ON YOUR PURCHASE! \nWE WERE ABLE TO FULFILL YOUR PURCHASE.\n***********************");

  updateSQL(quantityLeft, userID);

};

function updateSQL(quantityLeft, userID){
  var query = "UPDATE products SET stock_quantity=" + quantityLeft + " WHERE item_id=" + userID;
  // console.log("this is the last step: " + query + "\n")
  connection.query(query, function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
};