const express = require("express");
const router = new express.Router();
//connect to db
require("../db/conn");
//model import in this page
const Student = require("../model/student");
router.get("/", (req, res) => {
  res.send("This is an API not a webpage");
});

//post method
//model return promise here it serve by async and await
router.post("/students", async (req, res) => {
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
router.get("/students", async (req, res) => {
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
router.get("/students/:id", async (req, res) => {
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
//update put patch request
//update students
router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const stData = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
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
//delete student by id
router.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const awData = await Student.findByIdAndDelete(_id);
    if (!awData) {
      res.send("not found").status(204);
    }
    res.send("Student record is deleted on our server").status(200);
    console.log(`student reacord is deleted st id is  ${_id} `);
  } catch (error) {
    res.status(400).send(`some error occur ${err}`);
    console.log(err);
  }
});
//exporting router
module.exports = router;
