const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/crud", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB database");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // exit app if db connection fails
  }
};

module.exports = connectDB;
