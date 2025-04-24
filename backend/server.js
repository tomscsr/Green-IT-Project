const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'Green_IT_User',
  password: 'GreenIT1!!',
  database: 'green_actions_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL connected');
});

// Route pour l'inscription de l'utilisateur
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('✅ User registered');
  });
});

// Route pour la connexion de l'utilisateur
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(401).send('Invalid credentials');
    res.json({ name: results[0].name, role: results[0].role });
  });
});

// Route pour ajouter une action pour l'utilisateur
app.post('/add-action', (req, res) => {
  const { email, actionName } = req.body;

  db.query('SELECT id FROM users WHERE email = ?', [email], (err, users) => {
    if (err || users.length === 0) return res.status(404).send('User not found');
    const userId = users[0].id;

    db.query('SELECT id FROM actions WHERE name = ?', [actionName], (err, actions) => {
      if (err || actions.length === 0) return res.status(404).send('Action not found');
      const actionId = actions[0].id;

      db.query('INSERT INTO user_actions (user_id, action_id) VALUES (?, ?)', [userId, actionId], (err) => {
        if (err) return res.status(500).send(err);
        res.send('✅ Action added');
      });
    });
  });
});

// Route pour récupérer les actions disponibles
app.get('/actions', (req, res) => {
  const query = 'SELECT * FROM actions';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Route pour récupérer le classement général
app.get('/detailed-leaderboard', (req, res) => {
  console.log('📥 Requête reçue pour /detailed-leaderboard');
  const query = `
    SELECT 
      u.name AS username,
      SUM(a.points) AS total_points,
      SUM(a.carbon_saved) AS total_carbon_saved
    FROM user_actions ua
    JOIN users u ON ua.user_id = u.id
    JOIN actions a ON ua.action_id = a.id
    GROUP BY u.name
    ORDER BY total_points DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Erreur lors de la récupération du classement:', err);
      return res.status(500).json({ error: err.message });
    }

    // Add rank based on the order of results
    const rankedResults = results.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    console.log('✅ Résultats du classement envoyés au client:', rankedResults);
    res.json(rankedResults);
  });
});

app.get('/my-actions', (req, res) => {
  const { email } = req.query;

  const query = `
    SELECT a.name, a.points, a.carbon_saved
    FROM user_actions ua
    JOIN users u ON ua.user_id = u.id
    JOIN actions a ON ua.action_id = a.id
    WHERE u.email = ?
  `;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('❌ Erreur lors de la récupération des actions de l\'utilisateur:', err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

app.get('/carbon-saved', (req, res) => {
  const { email } = req.query;

  const query = `
    SELECT SUM(a.carbon_saved) AS carbonSaved
    FROM user_actions ua
    JOIN users u ON ua.user_id = u.id
    JOIN actions a ON ua.action_id = a.id
    WHERE u.email = ?
  `;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('❌ Erreur lors de la récupération du CO2 économisé:', err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results[0]);
  });
});

// New route to verify admin status
app.get('/verify-admin', (req, res) => {
  const { email } = req.query;
  const query = 'SELECT role FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ isAdmin: results[0]?.role === 'admin' });
  });
});

// New route to add a new action (admin only)
app.post('/admin/add-action', (req, res) => {
  const { adminEmail, name, description, points, carbon_saved } = req.body;
  
  // First verify admin status
  db.query('SELECT role FROM users WHERE email = ?', [adminEmail], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results[0] || results[0].role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Insert new action
    const query = 'INSERT INTO actions (name, description, points, carbon_saved) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, points, carbon_saved], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Action added successfully' });
    });
  });
});

// Replace the existing remove-action route with this:
app.delete('/remove-action', (req, res) => {
  const { email, actionName } = req.body;

  // First get the user_id and action_id
  const findIdsQuery = `
    SELECT ua.id
    FROM user_actions ua
    JOIN users u ON ua.user_id = u.id
    JOIN actions a ON ua.action_id = a.id
    WHERE u.email = ? AND a.name = ?
    ORDER BY ua.timestamp DESC
    LIMIT 1
  `;

  db.query(findIdsQuery, [email, actionName], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No action found to remove' });
    }

    // Now delete the specific user_action
    const deleteQuery = 'DELETE FROM user_actions WHERE id = ?';
    db.query(deleteQuery, [results[0].id], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err.message });
      }
      
      res.json({ message: 'Action removed successfully' });
    });
  });
});

// Ajouter une nouvelle route pour la suppression totale d'une action par l'admin
app.delete('/admin/delete-action', (req, res) => {
  const { adminEmail, actionName } = req.body;

  // Vérifier les droits admin
  db.query('SELECT role FROM users WHERE email = ?', [adminEmail], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results[0] || results[0].role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Supprimer l'action et toutes ses références
    db.query('DELETE FROM actions WHERE name = ?', [actionName], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Action completely deleted' });
    });
  });
});

// New route for admin to delete user
app.delete('/admin/delete-user', (req, res) => {
  const { adminEmail, targetEmail } = req.body;

  db.query('SELECT role FROM users WHERE email = ?', [adminEmail], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results[0] || results[0].role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    db.query('DELETE FROM users WHERE email = ?', [targetEmail], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User deleted successfully' });
    });
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
