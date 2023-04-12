'use strict';
const express = require('express');
const cors = require('cors');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/passport');
const app = express();
const port = 3000;

// Log middleware
app.use((req, res, next) => {
    console.log(Date.now() + ': request: ' + req.method + ' ' + req.path);
    next();
});

// Serve example-ui
//its for localhost: app.use(express.static('example-ui'));
app.use('/', express.static('example-ui'));
//for azure app.use('/', express.static('example-ui'));
// for do /upload/show picture
//serve image files
app.use('/uploads',express.static('uploads'));
// Add 'Access-Control-Allow-Origin: *' header to all responses using cors
// middleware
app.use(cors());
// middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));