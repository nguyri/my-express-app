const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;  // You can set the port using an environment variable or default to 3000


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
    res.json({ message: `Hello, ${query}!` });
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});