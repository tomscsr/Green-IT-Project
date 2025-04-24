// admin.js
const adminEmail = localStorage.getItem('userEmail');

// Check if user is admin
async function checkAdmin() {
  const res = await fetch(`http://localhost:3000/verify-admin?email=${adminEmail}`);
  const data = await res.json();
  
  if (data.isAdmin) {
    document.getElementById('adminControls').style.display = 'block';
    document.getElementById('unauthorized').style.display = 'none';
    loadAllActions();
  } else {
    document.getElementById('adminControls').style.display = 'none';
    document.getElementById('unauthorized').style.display = 'block';
  }
}

// Add new action
document.getElementById('addActionForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const action = {
    adminEmail,
    name: document.getElementById('actionName').value,
    description: document.getElementById('actionDescription').value,
    points: parseInt(document.getElementById('actionPoints').value),
    carbon_saved: parseFloat(document.getElementById('actionCarbon').value)
  };

  try {
    const res = await fetch('http://localhost:3000/admin/add-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action)
    });
    if (res.ok) {
      alert('Action added successfully');
      loadAllActions();
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to add action');
  }
});

// Delete user
document.getElementById('deleteUserForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const targetEmail = document.getElementById('targetEmail').value;

  try {
    const res = await fetch('http://localhost:3000/admin/delete-user', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminEmail, targetEmail })
    });
    if (res.ok) {
      alert('User deleted successfully');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to delete user');
  }
});

// Load all actions
async function loadAllActions() {
  const res = await fetch('http://localhost:3000/actions');
  const actions = await res.json();
  const container = document.getElementById('allActions');
  container.innerHTML = actions.map(action => `
    <div class="action-item">
      <h3>${action.name}</h3>
      <p>${action.description}</p>
      <p>Points: ${action.points}</p>
      <p>Carbon Saved: ${action.carbon_saved}g</p>
      <button onclick="deleteAction('${action.name}')" class="delete-btn">Delete Action</button>
    </div>
  `).join('');
}

// Ajouter la fonction pour supprimer totalement une action
async function deleteAction(actionName) {
  if (confirm(`Are you sure you want to delete the action "${actionName}"? This will remove it for all users.`)) {
    try {
      const res = await fetch('http://localhost:3000/admin/delete-action', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail, actionName })
      });
      
      if (res.ok) {
        alert('Action deleted successfully');
        loadAllActions();
      } else {
        throw new Error('Failed to delete action');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete action');
    }
  }
}

// Initialize admin panel
checkAdmin();
