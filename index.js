const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const { ProductRoute, CategoryRoute } = require("./route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use(express.static(__dirname + '/public'));

/* Routes */
app.use("/api",CategoryRoute);
app.use("/api",ProductRoute);
/* END Routes */

/* Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

app.listen(process.env["PORT"], () => {
  console.log(`servidor rodando na porta ${process.env["PORT"]}`);
});
