import mongoose from "mongoose";

//* Define the schema with different options
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    get: function (val) {
      return val.toUpperCase(); //* Getter modifies value when retrieved
    }
  },
  email: String,
  inportantId: {
    type: String,
    select: false, //* Exclude this field by default in queries
  },
  age: {
    type: Number,
    validate: function (value) {
      if (value < 18) throw new Error("Age validation failed! You are underage!"); //! Throws validation error if age < 18
      return true;
    }
  }
});

//* Alias for name field
userSchema.add({ fullName: { type: String, alias: "name" } });

//* Set transform function to modify JSON output
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret._id; //* Remove _id when converting to JSON
    delete ret.__v; //* Remove __v (MongoDB version key)
    return ret;
  }
});

//* Create the model
const User = mongoose.model("Users", userSchema);

const myfunc = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/demoDB"); //* Connect to MongoDB

    //* Insert multiple users
    await User.insertMany([
      { name: "Alice", email: "alice@example.com", age: 20 },
      { name: "Bob", email: "bob@example.com", age: 25 }
    ]);

    //* Find all users
    const allUsers = await User.find();
    console.log(allUsers);

    //* Find users with excluded field included
    const usersWithId = await User.find().select("+inportantId"); //? How to include a previously excluded field
    console.log(usersWithId);

    //* Insert a single user
    await User.insertOne({ name: "Sounka", email: "sounka@example.com", age: 22 });

    //* Delete all users
    await User.deleteMany({}); //* Remove all documents from the collection

  } catch (err) {
    console.log("Error: " + err.message); //! Catch and log any errors
  } finally {
    mongoose.disconnect(); //* Disconnect from MongoDB
  }
};

myfunc();
