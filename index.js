const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const postsRouter = require("./routers/posts");

app.use(express.json());

// routes
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
