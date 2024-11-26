const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;  // You can set the port using an environment variable or default to 3000
const v = require('./validator');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');


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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

app.use(cors());
app.use('/api/', limiter); // Apply rate limiting to all /api/ routes
app.use(express.json({ limit: '10kb' })); // Limit JSON payload to 10 KB

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON payload' });
  }
  next();
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Example GET API endpoint
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the Express server!' });
  });


// Example POST API endpoint
app.post('/api/queries/riichi', [body('query').isString().withMessage('Query must be a string')
  .trim().escape().notEmpty().withMessage('Query cannot be empty')
  .isLength({ min: 28, max: 28 }).withMessage('Query must be exactly 28 characters long'),]
  ,(req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid query parameter' });
    }
    const output = jsonResults(query);
    // console.log('output:', output);
    res.json(output);
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ error: 'Internal server error' })
  }
  });


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});