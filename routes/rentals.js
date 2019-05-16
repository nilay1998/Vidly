const Rental = require('../models/rental'); 
const Movie = require('../models/movies'); 
const Customer = require('../models/customers'); 
const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Fawn= require('fawn');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);

  const movie = await Movie.findById(req.body.movieId);

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();

  //TRANSACTIONS OR TWO-PHASE COMMITS 
  try{
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', {_id:movie._id},{
        $inc: {numberInStock:-1}
      })
      .run();
  }

  catch(ex)
  {
    res.status(500).send('Something failed.');
  }
  
  res.send(rental);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  res.send(rental);
});

module.exports = router; 