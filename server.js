var express = require("express");
var app = express();
var moment = require("moment");
var path = require("path");
var not_available = {
  "unix" : null,
  "natural" : null
};

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:request', function(req, res) {
  console.log(req.params.request);
  res.end(makeResponse(req.params.request));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening');
});

function makeResponse(dateString) {
  var myDate;
  if(/^\d{8,}$/.test(dateString)) {
    myDate = moment(dateString, "X");
  } else {
    myDate = moment(dateString, "MMMM D, YYYY");
  }

  if(myDate.isValid()) {
    return JSON.stringify({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    return JSON.stringify({
      unix: null,
      natural: null
    });
  }
}