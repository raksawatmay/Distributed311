let express = require("express");
let bodyParser = require("body-parser");
let router = express.Router();
let app = express();

app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);

let stds = [
  {
    no: 0,
    id: "5935512044",
    name: "Theerayut",
    surname: "Charoensuksomboon",
    major: "CoE",
    gpa: 4.0
  },
  {
    no: 1,
    id: "5935512045",
    name: "Sorind",
    surname: "Susan",
    major: "FIS",
    gpa: 3.2
  }
];

let stdIndex = 2;

router
  .route("/student")
  .get((req, res) => {
    res.json(stds);
  })
  .post((req, res) => {
    var std = {};
    std.no = stdIndex++;
    std.id = req.body.id;
    std.name = req.body.name;
    std.surname = req.body.surname;
    std.major = req.body.major;
    std.gpa = req.body.gpa;
    stds.push(std);
    res.json({ message: "Student created!" });
  });

router
  .route("/student/:std_id")
  .get((req, res) => res.json(stds[req.params.std_id]))
  .put((req, res) => {
    var id = req.params.std_id;
    stds[id].id = req.body.id;
    stds[id].name = req.body.name;
    stds[id].surname = req.body.surname;
    stds[id].major = req.body.major;
    stds[id].gpa = req.body.gpa;
    res.json({ message: "Student updated!" + req.params.std_id });
  })
  .delete((req, res) => {
    delete stds[req.params.std_id];
    res.json({ message: "Student Delete!" + req.params.std_id });
  });  

router.route("/student").get((req, res) => res.json(stds));
app.use("*", (req, res) => res.status(404).send("404 Not found"));
app.listen(8000, () => {
  console.log("http://localhost:8000/api/student");
});
