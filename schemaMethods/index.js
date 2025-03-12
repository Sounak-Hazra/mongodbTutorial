import mongoose from "mongoose";
import userSchema from "./user.js";

async function func() {
  try {
    // ✅ Connecting to MongoDB
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("✅ Connected to MongoDB");

    // ✅ Defining the User model
    const User = mongoose.model("User", userSchema);

    // ✅ Inserting test data (Uncomment if running for the first time)
    // await User.insertMany([
    //   { name: "Sounak", type: "admin" },
    //   { name: "Alice", type: "admin" },
    //   { name: "Bob", type: "user" }
    // ]);
    // console.log("✅ Users inserted");

    // ✅ Finding a user by name
    const me = await User.findOne({ name: "Sounak" });
    console.log("🔍 Found user:", me);

    // ✅ Adding a friend to 'friends' array (Ensure the ID exists in your database)
    // me.frineds.push("67d1707281fed269c08dcaea");
    // await me.save();
    // console.log("✅ Friend added");

    // ✅ Populating the 'friends' field
    // const populatedUser = await User.findOne({ name: "Sounak" }).populate("frineds");
    // console.log("👥 Populated User:", populatedUser);

    // ✅ Using instance method 'findSimilarTypes'
    // const similarUsers = await me.findSimilarTypes();
    // console.log("👥 Users with similar type:", similarUsers);

    // ✅ Using query helper 'byName'
    // const usersByName = await User.find().byName("Alice");
    // console.log("🔍 Users found using query helper:", usersByName);

    // ✅ Using static method 'byName'
    // const usersStatic = await User.byName("Bob");
    // console.log("🔍 Users found using static method:", usersStatic);

    // ✅ Accessing virtual field
    console.log("📝 Virtual Field:", me.toJSON().nameemail);

    // ✅ Disconnecting from MongoDB
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

func();