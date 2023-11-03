const express = require('express');
const cors = require('cors');
const pokemon = require('pokemontcgsdk');

pokemon.configure({apiKey: '2edef687-c149-4a15-a7a3-a181e45bd2b5'})

const app = express();
const port = 3000;

const setsID = ['base1', 'base2', 'base3'];

// Configuration CORS pour autoriser les requêtes depuis https://api.pokemontcg.io/v2/sets
app.use(cors({
  origin: 'https://api.pokemontcg.io/v2/', // Remplacez par l'origine de votre application
}));

app.get('/api/sets/:userId', (req, res) => {
  const userId = req.params.userId;
  pokemon.set.find(userId)
  .then(set => {
    res.json({set});
  })
});

app.get('/api/sets', async (req, res) => {
  const data = [];
  
  // Use Promise.all to wait for all promises to complete
  await Promise.all(setsID.map(async setId => {
    try {
      const set = await pokemon.set.find(setId);
      data.push(set);
    } catch (error) {
      console.error('Error fetching set:', error);
    }
  }));

  res.json({ resultat });
  
});

app.get('/api/cards', async (req, res) => {
  const data = [];
  
  // Use Promise.all to wait for all promises to complete
  await Promise.all(setsID.map(async setId => {
    try {
      const cards = await pokemon.card.where({q: 'set.id:' + setId});
      data.push(cards.data);
    } catch (error) {
      console.error('Error fetching set:', error);
    }
  }));

  res.json({ data });
  
});

app.get('/api/sets/cards/:userId', async (req, res) => {
  const userId = req.params.userId;
  
  pokemon.card.where({ q: 'set.id:' + userId })
  .then(result => {
      res.json(result);
  })

  
});

app.get('/api/cards/:userId', (req, res) => {
  const userId = req.params.userId;
  pokemon.card.find(userId)
  .then(card => {
    res.json({card});
  })
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
