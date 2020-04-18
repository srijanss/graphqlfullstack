const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// connect to mlab database
mongoose.connect(
  "mongodb+srv://srijanss:newpass123@cluster0-jtrrs.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("Connected to database.");
});

// middlewares
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("now listening for requests on port 5000.");
});
