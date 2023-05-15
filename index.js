const express = require("express");
const request = require("request");
const axios = require("axios");
const path = require('path')
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get("/api/getData", (req, res) => {
  try {
    const { baseUrl } = req.body;
    if (!baseUrl) {
      return res
        .status(400)
        .json({ success: false, data: null, message: "Uri doent exist" });
    }
    axios
      .get(baseUrl)
      .then((data) => {
        if (data.data) {
          return res.status(200).json({ success: true, data: data.data });
        } else {
          return res
            .status(400)
            .json({ success: false, data: null, message: "No Data Found" });
        }
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ success: false, data: null, message: "No Data Found" });
      });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "No Data Found" });
  }
});

app.listen(PORT, () => console.log("server is running at PORT ", PORT));
