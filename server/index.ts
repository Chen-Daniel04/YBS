import express from 'express';
import chalk from 'chalk';
import connectDB from './db/conn';

const dotenv = require("dotenv");

//Starting express server
const app = express();
dotenv.config();
connectDB();

const port = process.env.PORT || 3015;

app.get('/', (req, res) => {
    res.send('Hello, Welcome from YBS App');
});

app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
})