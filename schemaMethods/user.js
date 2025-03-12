import mongoose from "mongoose";

// Define the User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Ensures every user has a name
    },
    email: {
        type: String,
        required: true, // Ensures every user has an email
        unique: true // Prevents duplicate emails
    },
    type: {
        type: String,
        required: true
    },
    friends: [{ // Fixed typo from "frineds" to "friends"
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User" // Ensure reference is correct with uppercase 'U'
    }]
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// =========================
// Schema Methods
// =========================
// This method finds all users with the same type as the current user
userSchema.methods.findSimilarTypes = function () {
    return this.model('User').find({ type: this.type });
};

// =========================
// Query Helper
// =========================
// This allows you to query users by their name using .byName(name)
userSchema.query.byName = function (name) {
    return this.find({ name: name });
};

// =========================
// Static Method
// =========================
// A static method to find users by name, called directly on the model
userSchema.statics.byName = function (name) {
    return this.find({ name: name });
};

// =========================
// Virtuals
// =========================
// A virtual field that concatenates the user's name and type
userSchema.virtual("nameemail").get(function () {
    return `I am ${this.name} and my role is ${this.type}`;
});

// Export the Schema
export default userSchema;