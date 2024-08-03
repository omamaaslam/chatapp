const dotenv = require("dotenv");
dotenv.config();
const PORT = 5000;
const mongoose = require("mongoose");
const { CONNECTION_STRING } = process.env;
mongoose
  .connect(CONNECTION_STRING)
  .then((res) => {
    console.log("Database connect");
  })
  .catch((error) => {
    console.log("Database is not connect", error);
  });
const app = require("express")();
const http = require("http").Server(app);

// import routes
const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

http.listen(PORT, function () {
  console.log(`Server is started visit: http://localhost:${PORT}`);
});
