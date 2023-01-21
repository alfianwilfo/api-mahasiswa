const express = require("express");
const app = express();
const port = 3000;
const route = require("./routes/");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", route);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
