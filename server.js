require("dotenv").config();
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require("./routes/user/index");
const food = require("./routes/food/index");
const comment = require("./routes/comment/index");
const favourite = require("./routes/favourite/index");
const file = require("./routes/file/index");
const {
  logRequestDetails,
  sqlSupport,
  languageResponse,
  sourceVerify,
} = require("./middleware/middleware");

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/memories", express.static(path.join(__dirname, "source")));
app.use(cors());
app.use(logRequestDetails);
app.use(sqlSupport);
app.use(languageResponse);
app.use(sourceVerify);

app.use("/memories", user);
app.use("/memories", food);
app.use("/memories", comment);
app.use("/memories", favourite);
app.use("/memories", file);

if (process.env.RUNNING_ENV === "development") {
  const server = http.createServer(app);
  server.listen(process.env.SERVER_LISTEN_PORT);
} else if (process.env.RUNNING_ENV === "production") {
  const server = https.createServer(app, {
    key: fs.readFileSync("./ssl/memories-food.online.key"),
    cert: fs.readFileSync("./ssl/memories-food.online_bundle.crt"),
  });
  server.listen(process.env.SERVER_LISTEN_PORT);
}
