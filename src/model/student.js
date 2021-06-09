const mongoose = require("mongoose");
const validator = require("validator");
// creating schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Emali should be uniq"],
    //using custome validation from validator package
    validator(va) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    min: 10,

    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//  creating of new model by schema
// this should be cap cause it is a class
const Student = new mongoose.model("Student", studentSchema);
//export module to main page
module.exports = Student;
