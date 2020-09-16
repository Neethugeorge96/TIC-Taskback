const mongoose = require('mongoose');


const schema = mongoose.Schema;

const employeeSchema = new schema({
    empId : Number,
    empName : String,
    email: String,
    password : String,
    department : String
})

module.exports = mongoose.model('employee',employeeSchema,'employee_details');