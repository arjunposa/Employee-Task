const express = require('express')
const ConnectDb = require('./MongoDB/DbConnection')
const EmployeeRoute = require('./Routers/Employee.route')
const cors = require('cors')
const app = express()
app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(cors({}))

app.use('/employe', EmployeeRoute)




app.listen(2000,'127.0.0.1', ()=>{
    ConnectDb()
    console.log(`Server is running at http://127.0.0.1:2000`)
})