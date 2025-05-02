const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4000;
const MONGO_DB = require('./config');
const updateRoute = require('./routes/updateRoute');

const app = express();
MONGO_DB();

app.use(cors());
app.use(express.json());
app.use('/api/update', updateRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

