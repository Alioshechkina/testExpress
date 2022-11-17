const express = require('express');
const package = require('./package.json')

const app = express();
const version = package.version

app.get('/health', (req, res) => {
  res.status(200).send({ status: "OK", version })
});
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
