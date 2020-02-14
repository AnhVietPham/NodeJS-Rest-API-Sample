const sql = require("./db")

const Customer = function (customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
}

Customer.create = (newCustomer, result) => {
    sql.query("insert into customers set ?", newCustomer, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return
        }
        console.log("Created customer: ", {id: res.insertId, ...newCustomer});
        result(null, {id: res.insertId, ...newCustomer} )

    });
}

Customer.getAllUsers = result => {
    sql.query("select * from customers", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return
        }

        console.log("Customers: ", res);
        result(null, res)
    });
}

module.exports = Customer