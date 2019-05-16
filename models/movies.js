const mongoose=require('mongoose');
const {genreSchema}=require('./genres');

const Movie=mongoose.model('Movie',new mongoose.Schema({
    title: String,
    genre:{
        type: genreSchema,
    },
    numberInStock: Number,
    dailyRentalRate: Number
}));

module.exports=Movie;