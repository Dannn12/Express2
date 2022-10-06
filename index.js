const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json())


 
const logger =(req, res, next) => {
     console.log(new Date());
     next();

};
  
app.use(logger);



app.use((req, res, next) =>{
    console.log("I just exist to be an example");
    return next();
})
app.get(`/`, (req, res) => res.send("hello my name is Dan"));

let names = ['DM', 'ED', 'RP', 'EI', 'SM'];

app.get('/getAll', (req, res) => {
    res.send(names)
});

app.put('/replace/:id', (req, res) => {
    const name = req.query.name;
    const index = req.params.id; 
    const old = names[index];
    names[req.params.id] = name;
    res.status(202).send(`${old} successfully replaced with ${name}`);
});

app.get('/get/:id', (req, res) => res.send(names[req.params.id]));



app.delete("/names/:id", (req, res) => res.send(names.splice(req.params.id, 1)));



app.post('/create', (req, res) => {
    const name = req.body.name;
    names.push(name);
    res.status(201).send(`${name} added successfully`);


});

const server = app.listen(4494, () =>
    console.log("hi"));