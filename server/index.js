import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpiRoutes.js";
import productRoute from "./routes/productRoutes.js";
import transactionRoute from './routes/transactionRoutes.js'
// DATA
import KPI from "./models/kpiModel.js";
import { kpis } from "./data/data.js";
import Product from "./models/productModel.js";
import { products } from "./data/data.js";
import Transaction from "./models/transactionModel.js";
import { transactions } from "./data/data.js";
// CONFIG
dotenv.config();
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/kpi", kpiRoutes);
app.use("/product",productRoute);
app.use("/transaction",transactionRoute);

// MONGOOSE
const PORT = process.env.PORT || 9000;
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, console.log(`server is running on PORT: ${PORT}`));
    // ADD DATA FOR ONE TIME
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products)
    // Transaction.insertMany(transactions)
  })
  .catch((err) => console.log("MongoDB doesn't connected" + err));
