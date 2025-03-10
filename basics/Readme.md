# MongoDB Mongoose Revision Notes

## **1️⃣ Schema Options**

### **`select: boolean`**
- **Purpose:** Excludes a field from query results by default unless explicitly selected.
- **Usage:**
  ```js
  const userSchema = new mongoose.Schema({
    secretInfo: { type: String, select: false }
  });
  ```
- **Example:**
  ```js
  const user = await User.findOne();
  console.log(user.secretInfo); // Undefined unless explicitly selected
  ```
  ```js
  const user = await User.findOne().select("+secretInfo");
  console.log(user.secretInfo); // Now it appears
  ```
- **✅ Do:** Use for sensitive fields like passwords or API keys.
- **❌ Don't:** Use for public data that needs frequent access.
- **📌 Real-life Example:** Hiding user passwords when fetching profiles in an authentication system.

---

### **`validate: function`**
- **Purpose:** Adds custom validation to schema fields.
- **Usage:**
  ```js
  const userSchema = new mongoose.Schema({
    age: {
      type: Number,
      validate: function (value) {
        if (value < 18) throw new Error("Age validation failed! You are underage!");
        return true;
      }
    }
  });
  ```
- **Example:**
  ```js
  await User.create({ name: "John", age: 16 }); // Throws validation error
  ```
- **✅ Do:** Use for data integrity checks (e.g., email format, age limits).
- **❌ Don't:** Use for constraints that should be handled at the frontend.
- **📌 Real-life Example:** Ensuring that users registering for an adult-only service are above 18.

---

### **`get: function`**
- **Purpose:** Transforms field data before returning it.
- **Usage:**
  ```js
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      get: function (val) {
        return val.toUpperCase();
      }
    }
  });
  ```
- **Example:**
  ```js
  const user = await User.findOne();
  console.log(user.name); // Will be uppercase
  ```
  **Note:** This transformation **won’t** be visible in the database, only when retrieving data.
- **✅ Do:** Use for formatting (e.g., capitalizing names, converting dates).
- **❌ Don't:** Modify critical data that needs to be stored as-is.
- **📌 Real-life Example:** Converting product names to uppercase for consistency when displaying in UI.

---

### **`set: function`**
- **Purpose:** Modifies data before storing it in the database.
- **Usage:**
  ```js
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      set: function (val) {
        return val.toLowerCase();
      }
    }
  });
  ```
- **Example:**
  ```js
  await User.create({ username: "JohnDoe" });
  const user = await User.findOne();
  console.log(user.username); // "johndoe" (stored in lowercase)
  ```
- **✅ Do:** Normalize data (e.g., emails in lowercase for case-insensitive searches).
- **❌ Don't:** Store transformed values that should remain as inputted.
- **📌 Real-life Example:** Ensuring all emails are saved in lowercase to prevent login mismatches.

---

### **`alias: string`**
- **Purpose:** Creates a virtual shortcut for a field.
- **Usage:**
  ```js
  const userSchema = new mongoose.Schema({
    fullName: { type: String, alias: "name" }
  });
  ```
- **Example:**
  ```js
  const user = await User.create({ fullName: "Alice" });
  console.log(user.name); // Outputs: "Alice"
  ```
- **✅ Do:** Use for more intuitive property names.
- **❌ Don't:** Expect aliases to work in database queries.
- **📌 Real-life Example:** Allowing `fullName` to be accessed as `name` for better API compatibility.

---

### **`immutable: boolean`**
- **Purpose:** Prevents modifications to a field after creation.
- **Usage:**
  ```js
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      immutable: true
    }
  });
  ```
- **Example:**
  ```js
  const user = await User.create({ username: "user123" });
  user.username = "newUser"; // ❌ Change is ignored
  await user.save();
  console.log(user.username); // "user123"
  ```
- **✅ Do:** Use for unique identifiers (e.g., usernames, order numbers).
- **❌ Don't:** Use for fields that require updates.
- **📌 Real-life Example:** Preventing users from changing their unique usernames after registration.

---

### **`transform: function`**
- **Purpose:** Modifies the JSON output when calling `.toJSON()` or `JSON.stringify()`.
- **Usage:**
  ```js
  userSchema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret._id;  // Remove _id from output
      delete ret.__v;  // Remove version key
      return ret;
    }
  });
  ```
- **Example:**
  ```js
  const user = await User.findOne();
  console.log(JSON.stringify(user)); // Output without _id and __v
  ```
- **✅ Do:** Use to remove unwanted fields in API responses.
- **❌ Don't:** Modify essential fields that clients rely on.
- **📌 Real-life Example:** Cleaning up API responses by removing MongoDB-specific fields.

---

This document now includes **Dos & Don'ts** and **Real-life Examples** for each topic! 🚀 Let me know if you need any further tweaks. 😎

