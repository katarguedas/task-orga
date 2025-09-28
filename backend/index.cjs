const express = require("express");

// Express app
const app = express();


// Import Mongoose
const mongoose = require("mongoose");

//Import dotenv
const dotenv = require("dotenv").config();


// Import and aply cors package
const cors = require("cors");
app.use(cors());

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;


app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Connect to Mongoose:
if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      // Listen for requests only after connecting to DB:
      app.listen(port, () => {
        console.log(`Connected to DB & listening on port ${port}!`);
      });
    })
    // If there's an error connecting, we will see that in the terminal:
    .catch((error) => console.log(error));
}



app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})