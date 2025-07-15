const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import transport routes
const transportRoutes = require('./transportRoutes');
const newsRoutes = require('./newsRoutes');
const { startNewsScheduler } = require('./newsFetcher');

// Routes
app.use('/api/transport', transportRoutes);
app.use('/api/news', newsRoutes);

app.get('/api/sarkari-updates', (req, res) => {
  const filePath = path.join(__dirname, 'updates.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.json({ updates: [] });
    try {
      const updates = JSON.parse(data);
      res.json({ updates });
    } catch {
      res.json({ updates: [] });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Bairiyadih Village API is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
startNewsScheduler(); 