const express = require("express");
const userRoute = require("./routes/userRoute");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./utils/cors"));

app.use("/", userRoute);

app.listen(process.env.PORT || 1234, (err) => {
  if (err) {
    console.log("Error in sever Staring ", err);
  } else {
    console.log("Server started .....");
  }
});
