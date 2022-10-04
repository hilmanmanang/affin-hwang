const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const customer = require('./routes/api/customer');
app.use('/api/customer', customer);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server listen on port ${port}`));