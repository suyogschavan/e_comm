const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");
const PORT = process.env.PORT || 3000;
const URI = process.env.URI;
const app = express();

// all routes
const usersRouter = require('./routes/users')
const buyersRouter = require('./routes/buyers')
const productRouter = require('./routes/products')
const catlogsRouter = require('./routes/catlogs')
const ordersRouter = require('./routes/orders');
const sellerRouter = require('./routes/sellers');
// const authJWT = require("./helpers/jwt");

app.use(bodyParser.json()); 
app.use(morgan("tiny"));

app.use('/api/products', productRouter);
app.use('/api', usersRouter);
app.use('/api/buyer', buyersRouter);
app.use('/api/seller', sellerRouter);

// app.use(authJWT); 

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
