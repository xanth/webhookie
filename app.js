var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var sys = require('sys')
var exec = require('child_process').exec;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

var router = express.Router();

function myExec(cmd){
  exec(cmd, function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};

router.post('/', function(req, res) {
    console.log(req.body);
    myExec(req.body.cmd);
    res.json({ });
});

app.use('/', router);

app.listen(port);
