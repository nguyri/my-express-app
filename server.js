const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;  // You can set the port using an environment variable or default to 3000
const v = require('./validator');


const formatOutput = (query) => {
  let tests = [v.allValidTiles, v.allValidTiles, v.riichi]
  let results = []
  for (const test of tests) {
    let result = test(query) ? 'Pass' : 'Fail';
    results.push(result);
  }
  const spacedQuery = query.match(/.{1,2}/g).join(" ");
  console.log(spacedQuery);
  let output = {query:spacedQuery, tests:tests.map((test) => test.name), results};
  console.log(output);
  return output;
}

app.use(cors());
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Example GET API endpoint
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the Express server!' });
  });

// Example POST API endpoint
app.post('/api/data', (req, res) => {
    // console.log(req.body);
    const { query } = req.body;
    res.json({message:JSON.stringify(formatOutput(query), null, 2)});
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});