const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;  // You can set the port using an environment variable or default to 3000

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});