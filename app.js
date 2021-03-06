const express = require("express");
const bodyParser = require("body-parser");

const url = require("./server/routes/urlRoute");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== "production") {
  app.use("/api", url);
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/client/build"));
  const path = require("path");
  app.get("*", () => {
    res.sendFile(path(__dirname,"client","build","index.html"));
  });
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    code: err.status
  });
});

module.exports = app;
