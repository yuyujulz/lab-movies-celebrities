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
    res.render('celebrities/new-celebrity')
    )
})

router.get('/celebrities',(req,res)=>{
    Celebrity.find()
    .then((result)=> {
        console.log(result)
        res.render('celebrities/celebrities', {result})
    })
    .catch((error)=> {
        console.log('cought it!', error)
    })
})


module.exports = router;