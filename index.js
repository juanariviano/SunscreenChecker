import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

var app = express();
var port = 3000;
const api = "openuv-rpackrlz9bd7gk-io";
var lat; var lng; var alt; var dt;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/getUv", async (req, res) => {
    lat = req.body.latitude;
    lng = req.body.longitude;
    alt = req.body.altitude;
    dt = req.body.date;
    var url = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}&alt=${alt}&dt=${dt}`;
    console.log(req.body);
  try {
    const response = await axios.get(url,
      {
        headers: {
          "x-access-token": api,
        },
      }
    );
    const result = response.data;
    console.log(result.result.uv);
    res.render("view.ejs", {
      uvIdx: result.result.uv,
      uvMax: result.result.uv_max,
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
