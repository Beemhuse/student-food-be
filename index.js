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
import checkoutRoutes from './routes/checkout.js';
import uploadImageRoutes from './routes/upload-image.js';
import serviceFeeRoutes from './routes/service-fee.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Euodia API",
      version: "1.0.0",
      description: "API documentation for Euodia application",
    },
    servers: [
      {
        url: "https://student-food-be.onrender.com/",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Dish: {
          type: "object",
          required: ["title", "description", "price", "category", "image", "status", "sortOrder"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated ID of the dish",
            },
            title: {
              type: "string",
              description: "The name of the dish",
            },
            description: {
              type: "string",
              description: "A brief description of the dish",
            },
            price: {
              type: "number",
              description: "Price of the dish",
            },
            category: {
              type: "string",
              description: "Category ID the dish belongs to",
            },
            image: {
              type: "string",
              description: "Image URL of the dish",
            },
            status: {
              type: "boolean",
              description: "Availability status of the dish",
            },
            sortOrder: {
              type: "number",
              description: "Sorting order of the dish",
            },
          },
        },
        Category: {
          type: "object",
          required: ["title", "slug"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated ID of the category",
            },
            title: {
              type: "string",
              description: "The name of the category",
            },
            slug: {
              type: "object",
              properties: {
                current: {
                  type: "string",
                  description: "URL-friendly slug generated from the title",
                },
              },
            },
            description: {
              type: "string",
              description: "A brief description of the category",
            },
          },
        },
        Service: {
          type: "object",
          required: ["location", "fee"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated ID of the category",
            },
            location: {
              type: "string",
              description: "The name of the category",
            },
            fee: {
              type: "number",
              description: "The service fee amount",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/**/*.js", "./src/index.js"],
};

export default swaggerOptions;



// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Euodia API",
//       version: "1.0.0",
//       description: "API documentation for euodia application",
//     },
//     servers: [
//       {
//         url: `https://student-food-be.onrender.com/`,
//         description: "Development server",
//       },
//     ],
//   },
//   apis: ['./routes/**/*.js', './src/index.js'],
// };


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
app.use('/api/checkout', checkoutRoutes);
app.use('/api/upload-image', uploadImageRoutes);
app.use('/api/service-fee', serviceFeeRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
