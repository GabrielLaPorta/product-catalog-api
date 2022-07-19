const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const { CategoryRoute, LoginRoute, ProductRoute, UserRoute, PublicRoute } = require("./route");

const { ValidateTokenMiddleware } = require("./middleware");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

  next();
});
app.use(express.static(__dirname + '/public'));
/* Unauthenticated Routes */
app.use("/api",LoginRoute);
app.use("/api",PublicRoute);

app.use(ValidateTokenMiddleware);
/*Authenticated Routes */
app.use("/api",CategoryRoute);
app.use("/api",ProductRoute);
app.use("/api",UserRoute);
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
