const express=require('express');
const app = express();
const winston=require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();


//throw new Error('Something has failed during startup');

// const p=Promise.reject(new Error('Something failed miserably!'));
// p.then(()=>console.log('Done'));

   
app.listen(3000, ()=>winston.info('Listening on port 3000...'));