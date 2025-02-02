const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
//const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
//const Stack = require('Stack');
//routes path
const authRoutes = require("./routes/authRoutes");
//const openaiRoutes = require('./routes/openaiRoutes');

//dotenv
dotenv.config();

//mongo connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoutes);
const openaiRoutes = require('./routes/openaiRoutes');  // Correct path to the routes file

//listen server
app.listen(PORT, () => {
    console.log(
        `Server Running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan
            .white
    );
});


