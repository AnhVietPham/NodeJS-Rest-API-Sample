const sql = require("./db")

const Customer = function (customer) {
    this.email = customer.emaill;
    this.name = customer.name;
    this.active = customer.active;
}

Customer.getAllUsers = result => {
    sql.query("select * from customers", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
        }

        console.log("Customers: ", res);
        result(null, res)
    });
}

module.exports = Customer