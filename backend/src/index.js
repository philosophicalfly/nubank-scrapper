const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const ConnectionString = 'mongodb+srv://nuAdmin:nuAdmin@cluster0-rmrex.mongodb.net/wazev?retryWrites=true&w=majority';
const Origin = 'http://localhost:3000';

mongoose.connect(ConnectionString, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

app.use(cors(
  {
    origin: Origin,
    credentials: true
  }
));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(routes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
