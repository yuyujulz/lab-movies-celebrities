const { find } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here

router.get('/celebrities/create', (req,res)=> {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req,res)=>{
    console.log(req.body)
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name:name,occupation:occupation,catchPhrase:catchPhrase})
    .then(()=> 
    res.redirect('/celebrities'))
    .catch((error)=> 
    res.redirect('/celebrities/new-celebrity')
    )
})
//relating to the GET request (URL) we revieve from the client
router.get('/celebrities',(req,res)=>{
    Celebrity.find()
    .then((result)=> {
        console.log(result)
        //Where in my APPLICATION/DIRECTORY is mh hbs that I want to show the user
        res.render('celebrities/celebrities', {result})
    })
    .catch((error)=> {
        console.log('cought it!', error)
    })
})


module.exports = router;