// API DOcumenATion
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import express from 'express';
//import "express-async-errors";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connectDB from './config/db.js';
//securty packges
import helmet from "helmet";

import mongoSanitize from "express-mongo-sanitize";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import errroMiddelware from './middlewares/errorMiddleware.js';

dotenv.config();

// mongodb connection
connectDB();

// Swagger api config
// swagger api options
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Job Portal Application",
        description: "Node Expressjs Job Portal Application",
      },
      servers: [
        {
              // url: "http://localhost:8080",
              url: "https://job-portal-1z2f.onrender.com"
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
const spec = swaggerDoc(options);
  

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(mongoSanitize());
const port =  process.env.PORT || 8080;



app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);


//homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation middelware
app.use(errroMiddelware);

app.get('/',(req,res)=>{
    res.send('It is the backend page ')
})


// app.listen( port ,()=>{
//     console.log(`server is running in ${process.env.DEV_MOD} at port number ${port}`.bgRed.white)
// });



