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
// start();

});
function start() {
    inquirer
    .prompt({
        type: "list",
        name: "case",
        message: " What would you like to do ? ",
        choices:["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
    })
    
    .then (function(answer) {

 
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
    })
};

// connection.end()
function viewLowInventory () {
    console.log("displaying items with an inventory count lower than five");
    connection.query("SELECT * FROM products WHERE stock_quantity <=5", function (err, res) {
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

    })
    
}

function addInventory() {
    inquirer
    .prompt([
        {
        type: "input",
        name: "item_id",
        message: "Which ID number would you like add to ?",
        validate: function (value) {
           if(isNaN (value) === false) {
                return true;
            } else {
            return false;
           }
        }
    },
    {            
            type: "input",
            name: "updatedStock",
            message: "Enter the amount that you need in stock.",
            validate: function (value) {
                if (isNaN (value) == false) {
                    return true;
                } else {
                    console.log("overrated");
                    
                    return false;
                }
            }      
        }
        ])
        .then(function (answer) { 
            console.log("Adding Inventory....");
            console.log();
            
    connection.query("UPDATE stock_quantity FROM products WHERE ?",function (err, res) {
            [
            
                {
                    stock_quantity: answer.updateStock
                },
                
            ]
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


    }
    )
})

};

start();
// start();

