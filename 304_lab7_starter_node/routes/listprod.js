const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.write("<title>YOUR NAME Grocery</title>")

    // Get the product name to search for
    let name = req.query.productName;
    
    /** $name now contains the search string the user entered
     Use it to build a query and print out the results. **/
    let query1 = "SELECT productName, quantity, price FROM product JOIN orderProduct ON product.productId = orderproduct.productId WHERE productName LIKE %(%s)% "
    let query2 = "SELECT productName, quantity, price FROM product JOIN orderProduct ON product.productId = orderproduct.productId";
    
    
    /** Create and validate connection **/
(async function() {
        try {
            let pool = await sql.connect(dbConfig);
            
            if(name == null){
             let results = await pool.request()
             .query(query2);
                
                res.write("<table>" +
                "<tr>" +
                    "<th>Name</th>" +
                    "<th>Quantity</th>" +
                    "<th>Price</th>" +
                     "<th>Add to Cart</th>" +
                "</tr>");
                
                for(let i = 0; i<results.recordset.length; i++) {
                    let result = results.recordset[i];
                    res.write("<tr>" +
                    "<td>" + result.productName + "</td>" +
                    "<td>" + result.quantity + "</td>" +
                    "<td>" + result.price + "</td>" +
                    "<td>" + addcart?id=<result.productid>&name=<result.productName>&price=<result.price> + "</td>" +
                    
                
            }
            else{
            let results = await pool.request()
                .query(query1, (name));
                
                res.write("<table>" +
                "<tr>" +
                    "<th>Name</th>" +
                    "<th>Quantity</th>" +
                    "<th>Price</th>" +
                "</tr>");
                              
                     for(let i = 0; i<results.recordset.length; i++) {
                    let result = results.recordset[i];
                    res.write("<tr>" +
                    "<td>" + result.productName + "</td>" +
                    "<td>" + result.quantity + "</td>" +
                    "<td>" + result.price + "</td>" +
                    "<td>" + addcart?id=<result.productid>&name=<result.productName>&price=<result.price> + "</td>" +
            }
                              
                              res.write("</table>");
    /** Print out the ResultSet **/

    /** 
    For each product create a link of the form
    addcart?id=<productId>&name=<productName>&price=<productPrice>
    **/

    /**
        Useful code for formatting currency:
        let num = 2.89999;
        num = num.toFixed(2);
    **/
        catch (err) {
            console.dir(err);
            res.write(err);
        }
    res.end();
});

module.exports = router;
