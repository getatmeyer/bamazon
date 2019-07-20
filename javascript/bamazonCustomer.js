var mysql = require ("mysql")
var inquirer = require ("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "UWbootcamp20!",
    database: "bamazon_db"

});
// connect to MYSQL server and sql database
connection.connect(function(err) {
        // console.log(" connected as item_id" + connection.threadId +  "\n");

    if (err) throw err;
    // displayProducts();
    start();
    
});


function start() {
    inquirer
    .prompt({
        name: "confirm",
        type: "confirm",
        message: "| Welcome to Bamazon! Would you like to place your order ? | ",
        choices:["PURCHASE", "EXIT"]
    })
    .then (function(answer) {
        // based on their answers, call post function
        if (answer.confirm === true) {
            // purchaseItem();
            displayProducts();
        } else {
            console.log("Come back again!");
        }
    });
}

//////// FUNCTIONS /////////////////////

function displayProducts() {
    console.log("displaying products...");
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        console.log(res);
        console.log("|---------------------------------------------------------------------------------------|");
        console.log("|----------------------------BAMAZON INVENTORY------------------------------------------|");
        console.log("|---------------------------------------------------------------------------------------|");
        console.log("|------------------------------==WELCOME==----------------------------------------------|");
        
        for (i= 0; i < res.length; i++) {
            console.log(" Product ID : " + res[i].item_id + " || Produce Name : " + res[i].product_name + " || Price : " + res[i].price + " || Stock_quantity: " + res[i].stock_quantity);
            console.log("|---------------------------------------------------------------------------------------|");   
        }

        purchaseItem();
        // connection.end();
    });
}

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

                return true;
            }
            return false;
        }
        },
    {
            name: "stock",
            type: "input",
            message: "How many units do you want?",
            validate: function(value) {
                var valid = value.match(/^[0-9]+$/)
                    if (valid) {

                  return true;
                }
                // return false;
                return  false;
              }
        }
            ])
            .then(function(answer) {


                console.log(answer);
                
        
                connection.query( 
                    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = ?',[answer.ID], function (err,res) {
                            if (err) throw err;
                            // console.log(err  + "err");
                            console.log(res);
                            // console.log(answer.stock );
                            // console.log(res[0].stock_quantity);

                    
                        if (answer.stock > res[0].stock_quantity) {
                            
                            console.log('Sorry, We have infsufficent quantity on this product');
                            console.log('This order has been cancelled');  
                            console.log("Would you like to try again?");
                              
                         } else {

                            var updatedQuantity =
                            ((res[0].stock_quantity - parseInt(answer.stock)));
                            console.log("Verfiying to see if the quantity of"+'\x1b[33m',answer.stock,'\x1b[0m',"is in stock.");
                            
                            // ((res[0].stock_quantity - (answer.stock)));
                            console.log("Your order is in stock!");
                            console.log("The remaining of Quantities is " +'\x1b[33m',updatedQuantity,'\x1b[0m' );
                            

                            connection.query(
                                // "UPDATE stock_quantity FROM products WHERE ?",
                                // "UPDATE stock_quantity WHERE item_id = ?",function (err,res) {
                                    "UPDATE stock_quantity WHERE ?",function (err,res) {
                                [
                                    {
                                        stock_quantity: updatedQuantity
                                    },
                                    
                                ],
                                function(err,res) {
                                if (err) throw err;
                                }
                            }
                            
                            );
                            // var totalCost = res[0].price * answer.stock_quantity;
                            var totalCost = ((res[0].price * parseFloat(answer.stock)));
                            console.log(res[0].price);
                            
                            console.log("Your cost is " +'\x1b[33m',totalCost,'\x1b[0m');
                            console.log("Thanks for your order");
                            console.log("Come back soon!!"); 
                             }
                            connection.end();
                            });
                        });
                    }
                    
              
                        // }}
                    
    //                     connection.end();
                    // })
        // });
    // }
    // // connection.end();


    // function cost (itemID, stock) {
    //     connection.query ("SELECT * FROM products WHERE ?", {

    //         item_id: itemID
            
    //     },
    //         function (err, res) {

    //         if (err) throw err; {

        
    //         var totalCost = res[0].price * stock;
            
    //         console.log("Your total is $ " + totalCost);
    //       
    

            


        



                   
           
    



