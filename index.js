const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const postsRouter = require("./routers/posts");
const errorHandler = require("./middlewares/errorHandler");
const notFoundRoute = require("./middlewares/notFoundRoute");

app.use(express.json());

// routes
app.use("/posts", postsRouter);

app.use(notFoundRoute);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
