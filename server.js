NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliYWZ1aW9tYXBmaGZocnRscnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MjczNTUsImV4cCI6MjA4NTEwMzM1NX0.FldhksdJzalyibyaChWncFFY5WTTx6IJrPl3I6oXGcA"

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabase = createClient('https://your-supabase-url.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliYWZ1aW9tYXBmaGZocnRscnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MjczNTUsImV4cCI6MjA4NTEwMzM1NX0.FldhksdJzalyibyaChWncFFY5WTTx6IJrPl3I6oXGcA');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/subscribe', async (req, res) => {
  const { name, email, proof } = req.body;

  // Insert subscription data into Supabase
  const { data, error } = await supabase.from('subscriptions').insert([{ name, email, proof }]);

  if (error) {
    return res.status(400).json({ message: 'Error subscribing', error });
  }

  res.status(200).json({ message: 'Subscription successful', data });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});