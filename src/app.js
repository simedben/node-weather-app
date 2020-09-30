const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// define paths for Exoress config

const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
// console.log("this is views path", viewPath);

// Setup handlebars engine and views location

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialspath);

// Setup static directory to serve

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    name: "Mohammed",
    title: "Weather",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Mohammed benabdellah",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mohammed ben",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide a valid location",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          console.log("Error:", error);
        } else {
          forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
              console.log(error);
            } else {
              res.send({
                forecast: forcastData,
                location: location,
              });
            }
          });
        }
      }
    );
    // res.send({
    //   forecast: 'It is snowing',
    //   location: req.query.address
    // });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  } else {
    res.send({
      products: [],
    });
  }

  console.log("something is here", req.query.search);
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error404: "Help article not found",
    title: "404 help",
    name: "Mohammed benabdellah",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error404: "My Error 404 page",
    name: "Mohammed benabdellah",
    title: "Page 404",
  });
});

app.listen(port, () => {
  console.log("server is up in port " + port);
});
