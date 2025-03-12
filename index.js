// // /src/index.js
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from "cors";

// // Import route files
// // import adminRoutes from './routes/admin';
// import dishesRoutes from './routes/dishes.js';
// import loginRoutes from './routes/auth/login.js';
// import verifyOtpRoute from './routes/auth/verifyOtp.js';
// // import orderRoutes from './routes/order.js';
// import forgotPasswordRoutes from './routes/auth/forgotPassword.js';
// import passwordResetRoutes from './routes/auth/resetPassword.js';
// import signupRoutes from './routes/auth/signup.js';
// import categoryRoutes from './routes/category.js';
// import contactRoutes from './routes/contact.js';

// dotenv.config(); // Load environment variables

// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());

// // Routes
// // app.use('/api/admin', adminRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/dishes', dishesRoutes);
// app.use('/api/login', loginRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/forgot-password', forgotPasswordRoutes);
// app.use('/api/verify-otp', verifyOtpRoute);
// app.use('/api/password-reset', passwordResetRoutes);
// app.use('/api/signup', signupRoutes);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// /src/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Import route files
// import adminRoutes from './routes/admin';
import dishesRoutes from './routes/dishes.js';
import loginRoutes from './routes/auth/login.js';
import verifyOtpRoute from './routes/auth/verifyOtp.js';
// import orderRoutes from './routes/order.js';
import forgotPasswordRoutes from './routes/auth/forgotPassword.js';
import passwordResetRoutes from './routes/auth/resetPassword.js';
import signupRoutes from './routes/auth/signup.js';
import categoryRoutes from './routes/category.js';
import contactRoutes from './routes/contact.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Euodia API",
      version: "1.0.0",
      description: "API documentation for euodia application",
    },
    servers: [
      {
        url: `https://student-food-be.onrender.com/`,
        description: "Development server",
      },
    ],
  },
  apis: ['./routes/**/*.js', './src/index.js'],
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
// app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dishes', dishesRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/forgot-password', forgotPasswordRoutes);
app.use('/api/verify-otp', verifyOtpRoute);
app.use('/api/password-reset', passwordResetRoutes);
app.use('/api/signup', signupRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
