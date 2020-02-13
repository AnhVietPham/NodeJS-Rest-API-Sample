const Customer = require("../models/customer.model");

exports.findAllUser = (req, res) => {
    Customer.getAllUsers((err, data) => {
        if(err) res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers"
        });
        else res.send(data);
    });
}