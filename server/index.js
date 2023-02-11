const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const router = require('./src/routes');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('MongoDB terhubung!');
});

app.use(express.json());
app.use(cors());

app.use('/api/v1/', router);

server.listen(port, () => console.log(`Server aktif diport ${port}!`));
