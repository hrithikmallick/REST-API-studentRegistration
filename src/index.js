//app starder from here creator Hrirhik Mallick 👌
const express = require("express");
const { get } = require("mongoose");
const app = express();
//port selceted for local and server
const port = process.env.PORT || 8081;
//all routing done here
const studentRouter = require("./routers/studentApi");
//middlewar for express json
app.use(express.json());
app.use(studentRouter);
//listening the port to start
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
