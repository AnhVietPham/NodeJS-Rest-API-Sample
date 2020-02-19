const sql = require("./db")

const Customer = function (customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
}

Customer.create = (newCustomer, result) => {
    sql.query("insert into customers set ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return
        }
        console.log("Created customer: ", { customerId: res.insertId, ...newCustomer });
        result(null, { customerId: res.insertId, ...newCustomer })

    });
}

Customer.getAllUsers = result => {
    sql.query("select * from customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return
        }

        console.log("Customers: ", res);
        result(null, res)
    });
}

Customer.getCustomerWithId = (customerId, result) => {
    sql.query("select * from customers where id = ?", [customerId], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return;
        }

        if (res.length) {
            console.log("Found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
}

Customer.removeWithId = (customerId, result) => {
    sql.query("delete from customers where id = ?", [customerId], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return;
        }

        if (res.afftedRows == 0) {
            result({
                kind: "not_found"
            }, null);
            return;
        }

        console.log("Deleted customer with id", customerId);
        result(null, res)
    });
}


module.exports = Customer