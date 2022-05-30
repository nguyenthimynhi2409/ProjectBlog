const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 5000;
const errorMiddleware = require("./middlewares/error");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require("./routes/UserRoute");

app.use("/api", user);

app.listen(port, () => {
  console.log("Server is running on port", port);
});

app.use(errorMiddleware);