const Customer = require("../models/customer.model");

exports.findAllUser = (req, res) => {
    Customer.getAllUsers((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers"
        });
        else res.send(data);
    });
}

exports.createNewUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    Customer.create(customer, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the customer"
            });
        } else {
            res.send(data);
        }
    });
}