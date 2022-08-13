const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressvalidator = require("express-validator");
const helmet = require("helmet");
// const path = require("path");
const compression = require("compression");
// const nodemailer = require{ 'nodemailer'};
const nodemailer = require('nodemailer');
// const buildPath = path.join(__dirname, '..', 'build');
// Routes
const auth = require("./routes/auth");
const user = require("./routes/user");
const category = require("./routes/category");
const product = require("./routes/product");
const braintree = require("./routes/braintree");
const order = require("./routes/order");
const email = require("./routes/email");

const app = express();

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected 🍕"));

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cookieParser());
app.use(expressvalidator());
app.use(cors());

// routes
app.use("/api", auth);
app.use("/api", user);
app.use("/api", category);
app.use("/api", product);
app.use("/api", braintree);
app.use("/api", order);
app.use("/api", email);

app.use("/_healthz", (request, response) => {
	response.json({
		message : "I am healthy"
	})
})
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port} 🎆`));
