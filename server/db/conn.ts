const dotenv = require("dotenv");
dotenv.config();
import mongoose from "mongoose";
import chalk from 'chalk';

const connectDB = async() => {
    try {
      const mongoURL = process.env.mongoURL;
      if (!mongoURL) {
        throw new Error('Database URL is not defined correctly');
      }
      await mongoose.connect(mongoURL);
      console.log(chalk.green('MongoDB Connected Successfully!'));
    } catch (error: any) {
      console.error(chalk.red(`MongoDB connection error: ${error.message}`));
    }
}

export default connectDB;