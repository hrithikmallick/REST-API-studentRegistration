//app starder from here creator Hrirhik Mallick 👌
const express = require("express");
const { get } = require("mongoose");
const app = express();
//port selceted for local and server
const port = process.env.PORT || 8081;
//connect to db
require("./db/conn");
//model import in this page
const Student = require("./model/student");
//middlewar for express json
app.use(express.json());
//get method
app.get("/", (req, res) => {
  res.send("hello world ");
});
//create a new student for register
//post method
//model return promise here it serve by async and await
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    console.log(req.body);
    await user.save();
    res.status(201).send("Your data has been saved on our db");
  } catch (err) {
    res.status(400).send(`some error occur ${err}`);
    console.log(err);
  }
});

//get method for all student
app.get("/students", async (req, res) => {
  try {
    const stData = await Student.find();
    console.log("Data send to client");
    res.status(200).send(stData);
  } catch (err) {
    res.status(400).send(`some error occur ${err}`);
    console.log(err);
  }
});
//for indivitul STUDENTS
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const stData = await Student.findById(_id);
    if (!stData) {
      res.send("not found").status(204);
    } else {
      console.log("here output of given _id");
      console.log(stData);
      res.send(stData);
    }
  } catch (error) {
    res.status(400).send(`some error occur ${err}`);
    console.log(err);
  }
});

//listening the port to start
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
