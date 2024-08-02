const dotenv = require("dotenv");
dotenv.config();
const PORT = 5000;
const mongoose = require("mongoose");
const DATABASECONNECTIONSTRING =
  "mongodb+srv://omamachohan:omama_chat_app@atlascluster.5q6re7i.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
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
