const express=require('express');
const router = express.Router();
const {Genre} = require('../models/genres');
const Movie=require('../models/movies');


router.get('/', async (req,res)=>
{
    const movie=await Movie.find();
     res.send(movie);
});

router.get('/:id',async (req,res)=>
{
    const movie=await Movie.findById(req.params.id);
    res.send(movie);
});

router.post('/',async (req,res)=>
{
    const genre= await Genre.findById(req.body.genreId);
    const movie=new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name: genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    const result=await movie.save();
    res.send(result);
});

router.put('/:id',async (req,res)=>
{
    const genre= await Genre.findById(req.body.genreId);
    const movie=await Movie.findByIdAndUpdate(req.params.id,
        {
            title:req.body.title,
            genre:
            {
                _id:genre._id,
                name: genre.name
            },
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate
        },{new:true});
    res.send(movie);
});

router.delete('/:id',async (req,res)=>
{
    const movie=await Movie.findByIdAndRemove(req.params.id);
    res.send(movie);
});

module.exports=router;