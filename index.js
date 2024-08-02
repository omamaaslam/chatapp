const dotenv = require("dotenv");
dotenv.config();
const PORT = 5000;
const mongoose = require("mongoose");
const DATABASECONNECTIONSTRING =
  "mongodb+srv://Omama:iamdeveloper@cluster0.awkgme8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(DATABASECONNECTIONSTRING)
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
app.use('/', userRoute);

http.listen(PORT, function () {
  console.log(`Server is started visit: http://localhost:${PORT}`);
});
