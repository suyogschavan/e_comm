const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");
const PORT = process.env.PORT || 3000;
const URI = process.env.URI;
const app = express();

const usersRouter = require('./routes/auth')
const buyersRouter = require('./routes/buyers')
const sellerRouter = require('./routes/sellers');
// const authJWT = require("./helpers/jwt");

app.use(bodyParser.json()); 
app.use(morgan("tiny"));

// app.use('/api/products', productRouter);
// const api='api';


// all routes
app.use('/api/auth', usersRouter);
app.use('/api/buyer', buyersRouter);
app.use('/api/seller', sellerRouter);

// app.use(authJWT); 

// mongodb connection 
mongoose
  .connect(URI)
  .then(() => {
    console.log("Database is connected...");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});