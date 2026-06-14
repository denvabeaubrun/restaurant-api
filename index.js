const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const restaurants = [
  { id: 1, name: "The Golden Fork", cuisine: "Italian", rating: 4.5, tables: 12, status: "open" },
  { id: 2, name: "Sakura Garden", cuisine: "Japanese", rating: 4.8, tables: 8, status: "open" },
  { id: 3, name: "El Rancho", cuisine: "Mexican", rating: 4.2, tables: 15, status: "closed" },
  { id: 4, name: "The Burger Joint", cuisine: "American", rating: 4.0, tables: 10, status: "open" },
];

// GET all restaurants
app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

// GET single restaurant
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  res.json(restaurant);
});
app.get('/', (req, res) => {
  res.redirect('/restaurants');
});

// POST new restaurant
app.post('/restaurants', (req, res) => {
  const newRestaurant = {
    id: restaurants.length + 1,
    ...req.body
  };
  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
});

// PATCH update status
app.patch('/restaurants/:id/status', (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  restaurant.status = req.body.status;
  res.json(restaurant);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Restaurant API running on port ${PORT}`));