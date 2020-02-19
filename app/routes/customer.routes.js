module.exports = app => {
    const customers = require("../controllers/customer.controller")

    // Retrieve all Customers
    app.get("/customers", customers.findAllUser);

    // Create a new Customer
    app.post("/customers", customers.createNewUser);

    // Find customer with customerId
    app.get("/customers/:customerId", customers.findWithId)

    // Delete customer with customerId
    app.delete("/customers/:customerId", customers.deleteWithId)
}