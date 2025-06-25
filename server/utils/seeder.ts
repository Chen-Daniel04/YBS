import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Admin from '../models/admin';
import connectDB from '../db/conn';

const dotenv = require("dotenv");
dotenv.config();

// Connect to database
connectDB();

// Admin data
const adminData = {
  name: 'PYI HEIN AUNG',
  email: 'pyiheinaung92@gmail.com',
  password: 'DanielHein04'
};

// Seed function
const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // Create admin user
    const admin = new Admin({
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

// Run seeder
seedAdmin(); 