module.exports = app => {
    const customers = require("../controllers/customer.controller")

    // Retrieve all Customers
    app.get("/customers", customers.findAllUser);

    // Create a new Customer
    app.post("/customers", customers.createNewUser);
}