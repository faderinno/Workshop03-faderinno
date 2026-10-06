const express = require('express');
const path = require('path');

// Task 1: Create Express App
const app = express();
const PORT = 3000;

// Path helper pointing to the public directory
const publicDir = path.join(__dirname, 'public');

// Task 2: Serve Static Files (CSS, images, etc.)
app.use(express.static(publicDir));

// Bonus (Task 6): Express Router for /api endpoints
const apiRouter = express.Router();

// Task 4: API Endpoint (GET /api/time)
apiRouter.get('/time', (req, res) => {
  res.json({
    currentTime: new Date().toISOString(),
    timestamp: Date.now()
  });
});


app.use('/api', apiRouter);

// Task 3: Route Handlers using res.sendFile()
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(publicDir, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(publicDir, 'contact.html'));
});

// Task 5: Custom 404 Error Handler (Catches unmatched routes)
// Placed after all valid routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(publicDir, '404.html'));
});

// Task 5: Custom 500 Error Handler (Catches internal errors)
// Note the 4 arguments: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).sendFile(path.join(publicDir, '500.html'));
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Available routes:`);
  console.log(`  - Home:    http://localhost:${PORT}/`);
  console.log(`  - About:   http://localhost:${PORT}/about`);
  console.log(`  - Contact: http://localhost:${PORT}/contact`);
  console.log(`  - API:     http://localhost:${PORT}/api/time`);
});