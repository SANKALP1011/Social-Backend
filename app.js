const express = require("express");
const app = express();

app.listen("3002", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Srver running");
  }
});
