const express = require('express')
let employees = require('./src/employees.json')
const validator = require('./validator.js');

const app = express()

app.use(express.json())

app.get('/api/employees/', (req, res, next) => {

    if (req.query.page) {
        let page = Number(req.query.page);
        res.json(employees.slice(2 * (page - 1), 2 * (page - 1) + 2));
    } else if (req.query.user == "true") {
        res.json(employees.filter((element) => element.privileges === "user"));
    } else if (req.query.badges) {
        console.log(req.query.badges)
        res.json(employees.filter((e) => e.badges.includes(req.query.badges)))
    } else {
        res.json(employees);
    }

})

app.get('/api/employees/oldest', (req, res, next) => {

    let ages = employees.map((employee) => {
        return Number(employee.age);
    });
    const max = Math.max.apply(Math, ages);

    res.json(employees.filter((e) => max === e.age));

})

app.post("/api/employees", (req, res, next) => {
    let isValid = validator.validator.validate(req.body, validator.schema);
    if(isValid.valid){
     
      employees.push(req.body)
      res.json({result: "done"});

    } else{
      res.status(400).json({"messsage":"bad_request" })
    }

  });

app.get('/api/employees/:name', (req, res, next) => {

    Object.keys(employees).forEach((key) => {
        if (req.params.name === employees[key].name) {
            res.status(201).json(employees[key])
        }
    })

});

app.listen(8000, () => {
    console.log("api running on http://localhost:8000/api/employees")
})