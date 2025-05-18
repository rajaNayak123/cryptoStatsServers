import express from 'express'
import mongoose from 'mongoose';
const statsRoutes = require('./routes/statsRoutes');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use('/', statsRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Mongo connected'));
require('./nats/subscriber');
module.exports = app;