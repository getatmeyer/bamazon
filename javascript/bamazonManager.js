var mysql = require("mysql")
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "UWbootcamp20!",
    database: "bamazon_db"

});
// connect to MYSQL server and sql database
connection.connect(function (err) {
    // console.log(" connected as item_id" + connection.threadId +  "\n");

    if (err) throw err;
    // displayProducts();
    // start();

});
function start() {
    inquirer
        .prompt({
            type: "list",
            name: "case",
            message: " What would you like to do ? ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
        })

        .then(function (answer) {


            switch (answer.case) {

                case "View Products for Sale":
                    display();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }

        });
}

function display() {

    console.log("displaying products...");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("|---------------------------------------------------------------------------------------|");
        console.log("|----------------------------BAMAZON INVENTORY------------------------------------------|");
        console.log("|---------------------------------------------------------------------------------------|");
        console.log("|------------------------------==WELCOME==----------------------------------------------|");

        for (i = 0; i < res.length; i++) {
            console.log(" Product ID : " + res[i].item_id + " || Produce Name : " + res[i].product_name + " || Price : " + res[i].price + " || Stock_quantity: " + res[i].stock_quantity);
            console.log("|---------------------------------------------------------------------------------------|");
        }
    })
};

// connection.end()
function viewLowInventory() {
    console.log("displaying items with an inventory count lower than five");
    connection.query("SELECT * FROM products WHERE stock_quantity <=5", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("|---------------------------------------------------------------------------------------|");
        console.log("|----------------------------BAMAZON INVENTORY------------------------------------------|");
        console.log("|---------------------------------------------------------------------------------------|");
        console.log("|------------------------------==WELCOME==----------------------------------------------|");

        for (i = 0; i < res.length; i++) {
            console.log(" Product ID : " + res[i].item_id + " || Produce Name : " + res[i].product_name + " || Price : " + res[i].price + " || Stock_quantity: " + res[i].stock_quantity);
            console.log("|---------------------------------------------------------------------------------------|");
        }

    })

}

// connection.query("UPDATE stock_quantity FROM products WHERE item_id = ?",function (err, res) {
// connection.query("UPDATE stock_quantity FROM products WHERE ?",function (err, res) {
    // connection.query("UPDATE stock_quantity WHERE ?",function (err, res) {
        
        
        // connection.query("UPDATE products SET ? WHERE ?", function (err, res) {
// }

// [
//     {
//         stock_quantity: answer.updatedStock
//     },
//     {
//         item_id: answer.inputId

//     }];               
//     if (err) throw err;

// if (err) throw err;

// if (err) throw err;

// console.log(res);
function addInventory() {
    // console.log("Adding to Inventory...");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // pushes item in an item array
        var itemArray = [];

        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i]).product_name

        }
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "product_Name",
                    choices: itemArray,
                    message: "What product would you like add to Bamazon Inventory?",
                }, 
                {
                    type: "input",
                    name: "qty",
                    message: "How much would you like to add?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            return false;}
                        }
                    
                }])
                    .then(function(answer) {
                        var current;
                        for(var i = 0; i<res.length; i++){
                            if(res[i].product_name === answer.product_Name) {
                                current =res[i].stock_quantity;
                            }
                        }
                        connection.query("UPDATE products SET ? WHERE ?", [
                            {
                                stock_quantity: current + parent(answer.qty),
                            },
                            {
                                 product_Name: answer.product
                            }], function(err, res){
                                if (err) throw err;
                                console.log("the quantity has been updated!");    
                        });
                    })
                });
            }
                start();
                
            
            
                
                    // type: "input",
                    // name: "updatedStock",
                    // message: "Enter the amount that you need in stock.",
                    // validate: function (value) {
                        // if (isNaN(value) == false) {
                            // return true;
                        // } else {
                            // console.log("overrated");

                            // return false;
                        // }//
                    // }
                // }
            // ])
            // .then(function (answer) {
                //Use res from the query above to get the stock_quantity of the selected item
                //  Once that item is found,  add its stock quantity to the amount they want to add

                //RUN THE UPDATE QUERY Below


                // connection.query(
                // "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                // [product.stocky_quantity + quantity, product.item_id],
                // function(err, res) {

                    // console.log("Succesfily added" + quantity + " " + product,product_name);
                    
                // }/)
                // )
                // console.log("<--answer", answer )
                // console.log(typeof answer.updatedStock + "<--answer.updateStock")
                // console.log("Adding Inventory....");


                // console.log("|---------------------------------------------------------------------------------------|");
                // console.log("|----------------------------BAMAZON INVENTORY------------------------------------------|");
                // console.log("|---------------------------------------------------------------------------------------|");
                // console.log("|------------------------------==WELCOME==----------------------------------------------|");

                // for (i = 0; i < res.length; i++) {

                    // console.log(" Product ID : " + res[i].item_id + " || Produce Name : " + res[i].product_name + " || Price : " + res[i].price + " || Stock_quantity: " + res[i].stock_quantity);
                    // console.log("|---------------------------------------------------------------------------------------|");

                // }
                //END LOOP
            
            //end if .then
    // })
// }
// function addProduct() {
//     inquirer.prompt([{

//         type: "name",
//         name: "productName",
//         message: "Please enter the item of the new Product."
//     },
//     {
//         type: "input",
//         name: "inputDepartment",
//         message: "Please enter which department for the new product to be added to."
//     },
//     {
//         type: "input",
//         name: "inputPrice",
//         message: "Please enter the price of the new product."
//     },
//     {
//         type: "input",
//         name: "inputStock",
//         message: "Please enter the stock quantity of the new product."
//     },
//     {
//     }
//     ]).then(function (answer) {

//         connection.query("INSERT INTO products SET ?", {
//             product_name: answer.productName,
//             department_name: answer.inputDepartment,
//             price: insertNew.answer.inputPrice,
//             stock_quantity: answer.inputStock
//         }, function (err, res) { });
//     });
// }
start();

