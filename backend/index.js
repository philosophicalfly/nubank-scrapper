const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nuAdmin:nuAdmin@cluster0-rmrex.mongodb.net/wazev?retryWrites=true&w=majority', {
   useNewUrlParser: true,   //Removing warnings
   useUnifiedTopology: true //Removing warnings
});

app.use(cors(
  // {
  //   origin: "http://localhost:3000",
  //   credentials: true
  // }
));
app.use(express.json())
app.use(routes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});