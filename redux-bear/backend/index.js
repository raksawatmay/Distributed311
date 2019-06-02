const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')


let musics = [
    { id: 1, name: "Wonderful tonight", price: 90 },
    { id: 2, name: "Morning star", price: 66 },
    { id: 3, name: "Bohemian Rhapsody", price: 253 }
  ];

app.use(cors())
app.use('/api', bodyParser.json() ,router)
app.use('/api', bodyParser.urlencoded({extended:false}) ,router)

router
  .route("/musics")
  .get((req, res) => res.json(musics))

  .post((req, res) => {
    var music = {};
    music.id = musics[musics.length - 1].id + 1;
    music.name = req.body.name;
    music.price = req.body.price;
    musics.push(music);
    res.json({ message: "Music created!" });
  });

router
    .route("/musics/:music_id")
    .get((req, res) => {
      let id = musics.findIndex(music => music.id === +req.params.music_id);
      res.json(musics[id]);
    }) 
  
    .put((req, res) => {
      let id = musics.findIndex(music => music.id === +req.body.music_id);
      musics[id].name = req.body.name;
      musics[id].price = req.body.price;
      res.json({ message: "Music updated!" + req.params.music_id });
    })
  
    .delete((req, res) => {
      musics = musics.filter( (music) => music.id !== +req.params.music_id )
      res.json({ message: 'Music deleted: ' + req.params.music_id});
    });

app.listen(8000, () => {
  console.log("Server is running");
  console.log("http://localhost:8000/api/musics");
});