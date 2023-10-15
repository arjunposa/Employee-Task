const {model} = require('mongoose')
const employSchema = require('../Schema/AddEmploy.Schema')

const employModel = model('Employes', employSchema)

module.exports = employModel