const Celebrity = require("../models/Celebrity.model");
const { find } = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");
//const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here
router.get('/movies/create', (req,res)=> {
    let genre = ["horror","comedy"]
    Celebrity.find()
    .then((allCelebs)=> {
        res.render('movies/new-movie', {allCelebs,genre})
    })
})

router.post('/movies/create', (req,res)=>{
    console.log(req.body)
    const {title, genre, plot, cast} = req.body
    MovieModel.create({title:title,genre:genre,plot:plot,cast:cast})
    .then(()=> 
    res.redirect('/movies'))
    .catch((error)=> 
    res.redirect('/movies/new-movie')
    )
})
//relating to the GET request (URL) we revieve from the client
router.get('/movies',(req,res)=>{
    MovieModel.find()
    .populate('cast')
    .then((result)=> {
        console.log(result)
        //Where in my APPLICATION/DIRECTORY is mh hbs that I want to show the user
        res.render('movies/movies', {result})
    })
    .catch((error)=> {
        console.log('cought it!', error)
    })
})

router.get('/movies/:id', (req,res)=>{
    MovieModel.findById(req.params.id)
    .populate('cast')
    .then((movie)=> {
        console.log(movie)
        //Where in my APPLICATION/DIRECTORY is mh hbs that I want to show the user
        res.render('movies/movie-details', movie)
    })
    .catch((error)=> {
        console.log('cought it!', error)
    })
})

router.post('/movies/:movieId/delete', (req, res, next) => {
    const { movieId } = req.params;
   
    MovieModel.findByIdAndDelete(movieId)
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
  });


router.get('/movies/:movieId/edit', (req, res)=>{
    MovieModel.findById(req.params.movieId)
    Celebrity.findOne()
    .then((allDetails)=>{ 
        res.render('movies/edit-movie', {allDetails})}
   )
})

router.post('/movies/:movieId', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
   
    MovieModel.findByIdAndUpdate(movieId, {title, genre, plot, cast}, {new:true})
      .then((updateMovie) => res.redirect('/movies/${updateMovie.id}'))
      .catch(error => next(error));
  });

module.exports = router;