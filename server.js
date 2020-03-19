const express = require('express')
const app = express()
var fs = require('fs');

app.use(express.static('public'));
app.get('/', function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})


app.get('/data.geojson', function (req, res) {
  fs.readFile('data.geojson', function(err, data) {
    res.write(data);
    res.end();
  });
})
app.get('/zozor.html', function (req, res) {
  fs.readFile('zozor.html', function(err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/index25.html', function (req, res) {
  fs.readFile('index25.html', function(err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/index52.html', function (req, res) {
  fs.readFile('index52.html', function(err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/index2.html', function (req, res) {
  fs.readFile('index2.html', function(err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/basicmapM3.js', function (req, res) {
  fs.readFile('basicmapM3.js', function(err, data) {
    res.write(data);
    res.end();
  });
})


app.get('/d3.min.js', function (req, res) {
  fs.readFile('d3.min.js', function(err, data) {
    res.write(data);
    res.end();
  });
})
app.get('/d3-textwrap.min.js', function (req, res) {
  fs.readFile('d3-textwrap.min.js', function(err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/occitanieM3.css', function (req, res) {
  fs.readFile('occitanieM3.css', function(err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/slope_populationM3.js', function (req, res) {
  fs.readFile('slope_populationM3.js', function(err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/stackedM3.js', function (req, res) {
  fs.readFile('stackedM3.js', function(err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/textwrap.js', function (req, res) {
  fs.readFile('textwrap.js', function(err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/data/summary_population.json', function (req, res) {
  fs.readFile('data/summary_population.json', function(err, data) {
    res.write(data);
    res.end();
  });
})


app.get('/data/population_stacked_categories.csv', function (req, res) {
  fs.readFile('data/population_stacked_categories.csv', function(err, data) {
    res.write(data);
    res.end();
  });
})


app.get('/data/dataCSV.csv', function (req, res) {
  fs.readFile('data/dataCSV.csv', function(err, data) {
    res.write(data);
    res.end();
  });
})


app.listen(3000, function () {
  console.log('This app is on port 3000!')
})