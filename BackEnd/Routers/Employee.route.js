const express = require('express')
const EmployeeRoute = express.Router()
const {postData, getData, deleteData, updateData, getIdData} = require('../Controllers/Employee.Controller')

EmployeeRoute.post('/',postData)
EmployeeRoute.get('/',getData)
EmployeeRoute.get('/:id',getIdData)
EmployeeRoute.delete('/delete/:id',deleteData)
EmployeeRoute.patch('/update/:id', updateData);
module.exports = EmployeeRoute