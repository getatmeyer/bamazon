var mysql = require ("mysql")
var inquirer = require ("inquirer");

var totalBalance

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "UWbootcamp20!",
    database: "bamazon_db"

});
// Establish connection
connection.connect(function(err) {
    if (err) throw err;
    console.log(" connected as item_id" + connection.threadId +  "\n");
    displayProducts();
    // start();
    
});
//////// FUNCTIONS ///////////////////////////////////////////////////

function displayProducts() {
    console.log("displaying products...");
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        console.log(res);
        console.log("|---------------------------------------------------------------------------------------|");
        console.log("|----------------------------BAMAZON INVENTORY------------------------------------------|");
        console.log("|---------------------------------------------------------------------------------------|");

        for (i= 0; i < res.length; i++) {
            console.log(" Product ID : " + res[i].item_id + " || Produce Name : " + res[i].product_name + " || Price : " + res[i].price + " || Stock_quantity: " + res[i].stock_quantity);
            console.log("|---------------------------------------------------------------------------------------|");   
        }
        purchaseItem();
        // connection.end();
    });
}
        
// function start() {
//     inquirer
//     .prompt({
//         name: "get",
//         type: "list",
//         message: "Which product would you like to [GET]?",
//         choices:["GET", "EXIT"]
//     })
//     .then (function(answer) {
//         // based on their answers, call post function
//         if (answer.product === "GET") {
//             purchaseItem();
//         }
//         connection.end();  
// })
// }

purchaseItem = function() {
    // prompt for info about the item being wanted
    inquirer.prompt([
        {
        name: "ID",
        type: "input",
        message: "Enter product ID you want to buy.",
        // filter: Number
        validate: function(value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
            // if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
            name: "stock",
            type: "input",
            message: "How many units do you want?",
            // filter: Number,
            validate: function(value) {
                var valid = value.match(/^[0-9]+$/)
                    if (valid) {
                // if (isNaN(value) === false) {
                  return true;
                }
                // return false;
                return 'Please enter a numerical value'
              }
        }
            ])
            .then(function(answer) {
                console.log(answer);
                
                // when finished prompting, insert p
                // connection.query("SELECT * FROM products", function(err,res) {
                    // var query = 'SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?';

                   // [
                     //   {

                        // product_name: answer.ID
                    //},
                   // {
                        // stock_quantity: answer.stock
                        // stock_quantity: answer.price

                    // }
                // ],
                connection.query(
                    // "SELECT * FROM products WHERE item_id = ?",[answer.ID], function (err,res) {
                        'SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = ?',[answer.ID], function (err,res) {
                            if (err) throw err;
                            console.log(err  + "err");
                            console.log(res);
                
                            

                            // for (var i = 0; i < res.length; i++) {
                                // console.log(res);
                                
                               
                            // }

                        // if (err) throw err;
                        console.log(answer.stock );
                        console.log(res[0].stock_quantity);
                        
                        
                        if (answer.stock > res[0].stock_quantity) {
                            
                            // console.log("Your proudct has been ordered.");
                            
                            // if (answer.stock_quantity === 0) {

                            // }

                            console.log('Sorry, We have infsufficent quantity on this product');
                            console.log('This order has been cancelled');    
                        // }
                        // else {
                            // console.log("Thanks for your order");
                            
                        }
                        connection.end();
                    }
                    )
    
                })
    }


                    // }]
                // connection.query( "SELECT * FROM products WHERE ?"
                    // "INSERT INTO items WHERE ?",
                    
                    // product_name: answer.ID,
                    // department_name: answer.department_name,
                    // price: answer.price,
                    // stock_quantity: answer.stock
                    // },
                    
                    // function(err) {
                        // if (err) throw err;
                        // console.log("Your item has been ordered!");
                    
                    // if (item.stock_quantity === 0) {
                    //    console.log("Sorry, We have insufficent quantity on this product ");
           
    



