import express from 'express';
import chalk from 'chalk';
import connectDB from './db/conn';
import adminAuthRoutes from './routes/adminAuthRoutes';
import routeRoutes from './routes/routeRoutes';
import busRoutes from './routes/busRoutes';

const dotenv = require("dotenv");

//Starting express server
const app = express();
dotenv.config();

// Connect to database with error handling
const startServer = async () => {
  try {
    await connectDB();
    console.log(chalk.green('✓ Database connected successfully'));
    
    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const port = process.env.PORT || 3015;

    // Routes
    app.get('/', (req, res) => {
        res.send('Hello, Welcome from YBS App');
    });

    // Admin Authentication Routes
    app.use('/api/admin', adminAuthRoutes);

    // Route Management Routes
    app.use('/api/routes', routeRoutes);

    // Bus Management Routes
    app.use('/api/buses', busRoutes);

    // Start server
    const server = app.listen(port, () => {
        console.log(chalk.green(`✓ Server is running on port ${port}`));
    });

    // Handle server errors
    server.on('error', (error: any) => {
        if (error.code === 'EADDRINUSE') {
            console.log(chalk.red(`✗ Port ${port} is already in use`));
            console.log(chalk.yellow('Please try a different port or stop the existing server'));
        } else {
            console.log(chalk.red('✗ Server error:', error.message));
        }
        process.exit(1);
    });

    // Handle server close
    server.on('close', () => {
        console.log(chalk.green('✓ Server closed'));
    });

  } catch (error) {
    console.log(chalk.red('✗ Failed to start server:'));
    console.log(chalk.red('Database connection failed or server initialization error'));
    console.log(chalk.red('Error details:', error));
    process.exit(1);
  }
};

// Start the server
startServer();