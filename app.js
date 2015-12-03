var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var _ = require('lodash');

var sys = require('sys')
var exec = require('child_process').exec;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

var router = express.Router();

function myExec(cmd, dir){
  exec(cmd, { cwd: dir}, function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};

var commands = [
  "git pull",
  "npm install --all",
  "webpack"
]

var work = [
  {
    dir: "/home/rhys/2509ict-software-engineering-master/",
    commands: commands
  },
  {
    dir: "/home/rhys/2509ict-software-engineering-rw-dev/",
    commands: commands
  },
  {
    dir: "/home/rhys/2509ict-software-engineering-nj-dev/",
    commands: commands
  }
];

router.post('/', function(req, res) {
    _(work).map(function(job){
      _(job.commands).map(function(cmd){
        myExec(cmd, job.dir);
      }).value();
    }).value();
    res.json({ });
});

app.use('/', router);

app.listen(port);
