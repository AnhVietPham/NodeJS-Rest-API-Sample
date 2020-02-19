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

exports.findWithId = (req, res) => {
    Customer.getCustomerWithId(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: 'Not found Customer with id ' + req.params.customerId
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving Customer with Id ' + req.params.customerId
                });
            }
        } else res.send(data);
    });
}

exports.deleteWithId = (req, res) => {
    Customer.removeWithId(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: 'Not found Customer with id' + req.params.customerId
                });
            } else {
                res.status(500).send({
                    message: 'Could not delete Customer with Id' + req.params.customerId
                });
            }
        } else {
            res.send({
                message: 'Customer was deleted successfully'
            });
        }
    });
};