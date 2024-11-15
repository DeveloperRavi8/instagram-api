const express = require('express');
require('dotenv').config();

const instagramRoute = require('./routes/instagram.route');

const app = express();

app.use(express.json());

app.use('/instagram', instagramRoute)

app.listen(3000, () => console.log('Server started on port 3000'));