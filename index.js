const express = require('express')
const employees = require('./src/employees.json')

const app = express()

app.use(express.json())

app.get('/api/employees', (req, res, next) => {
    res.json(employees)
})

app.get('/api/employees/:name', (req, res, next) => {
    const name = employees.find(val => val.name === Text(req.params.name))
    res.status(201).json(name)
})

app.listen(3001, () => {
    console.log("ready")
})