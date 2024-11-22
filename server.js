const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;  // You can set the port using an environment variable or default to 3000
const v = require('./validator');


const jsonResults = (query) => {
  const valid = v.allValidString(query);
  let tests = !valid ? [v.allValidString] : [v.allValidString, v.riichi]
  let results = []

  for (const test of tests) {
    results.push(test(query));
  }
  const spacedQuery = query.match(/.{1,2}/g).join(" ");
  let output = {query:spacedQuery, tests:tests.map((test) => test.name), results};
  // console.log(spacedQuery);
  // console.log(output);
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
app.post('/api/queries/riichi', (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid query parameter' });
    }
    const output = jsonResults(query);
    // console.log('output:', output);
    res.json(output);
  } catch (err) {
    // console.error('Error: ', err);
    res.status(500).json({ error: 'Internal server error' })
  }
  });


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});