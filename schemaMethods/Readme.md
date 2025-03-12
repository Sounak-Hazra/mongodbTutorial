# Mongoose Schema Methods, Query Helpers, Statics, and Virtuals

## **Overview**
This project demonstrates the usage of **Schema Methods, Query Helpers, Statics, and Virtuals** in Mongoose. It includes a `User` model with various functionalities such as custom queries, computed fields, and advanced query options.

---

## **Project Structure**
- `user.js` → Defines the `User` schema with methods, queries, statics, and virtuals.
- `index.js` → Connects to MongoDB and demonstrates the usage of these functionalities.

---

## **1️⃣ Schema Methods**
Schema methods allow you to define custom functions on documents.

```javascript
userSchema.methods.findSimilarTypes = function () {
    return this.model('User').find({ type: this.type });
};
```

### **🔹 Example Usage**
```javascript
const me = await User.findOne({ name: "Sounak" });
const similarUsers = await me.findSimilarTypes();
console.log(similarUsers);
```
✔ This finds all users with the same `type` as `me`.

---

## **2️⃣ Query Helpers**
Query helpers let you define custom functions that can be used in chainable queries.

```javascript
userSchema.query.byName = function (name) {
    return this.find({ name: name });
};
```

### **🔹 Example Usage**
```javascript
const user = await User.find().byName("Sounak");
console.log(user);
```
✔ This finds all users with the name `Sounak`.

---

## **3️⃣ Static Methods**
Static methods are defined on the model itself and can be called without creating a document instance.

```javascript
userSchema.statics.byName = function (name) {
    return this.find({ name: name });
};
```

### **🔹 Example Usage**
```javascript
const user = await User.byName("Alice");
console.log(user);
```
✔ This finds all users named `Alice`.

---

## **4️⃣ Virtuals**
Virtuals are computed properties that are not stored in the database but can be accessed like fields.

```javascript
userSchema.virtual("nameemail").get(function () {
    return `I am ${this.name} and my role is ${this.type}`;
});
```

### **🔹 Example Usage**
```javascript
const me = await User.findOne({ name: "Sounak" });
console.log(me.toJSON().nameemail);
```
✔ This outputs `I am Sounak and my role is admin`.

---

## **🚀 Running the Project**

### **1️⃣ Install Dependencies**
```sh
npm install mongoose
```

### **2️⃣ Run the Script**
```sh
node index.js
```

---

## **🛠 Common Issues & Fixes**

### **❌ `Model.find() no longer accepts a callback`**
✅ Fix: Convert callbacks to `async/await`.
```javascript
const users = await User.find();
```

### **❌ `ReferenceError: friends is not defined`**
✅ Fix: Ensure the field name is `friends`, not `frineds`.

### **❌ Virtuals not appearing in JSON**
✅ Fix: Add `toJSON: { virtuals: true }` in schema options.
```javascript
const userSchema = new mongoose.Schema({}, { toJSON: { virtuals: true } });
```

---

## **🎯 Conclusion**
This project covers essential Mongoose features that improve efficiency and readability in querying MongoDB. 🚀

