const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const app = express();

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