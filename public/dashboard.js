// dashboard.js
const email = localStorage.getItem('userEmail');
const name = localStorage.getItem('userName');
document.getElementById('userName').textContent = name;

async function fetchActions() {
  const res = await fetch('http://localhost:3000/actions');
  const data = await res.json();
  const select = document.getElementById('actionSelect');
  data.forEach(action => {
    const opt = document.createElement('option');
    opt.value = action.name;
    opt.textContent = `${action.name} (${action.points} pts / ${action.carbon_saved}g CO₂)`;
    select.appendChild(opt);
  });
}

document.getElementById('actionForm').addEventListener('submit', async e => {
  e.preventDefault();
  const actionName = document.getElementById('actionSelect').value;
  await fetch('http://localhost:3000/add-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, actionName })
  });
  loadUserActions();
});

async function loadUserActions() {
  try {
    const res = await fetch(`http://localhost:3000/my-actions?email=${email}`);
    if (!res.ok) {
      throw new Error('Failed to fetch user actions');
    }

    const data = await res.json();
    const container = document.getElementById('userActions');
    container.innerHTML = '';

    data.forEach(action => {
      const div = document.createElement('div');
      div.innerHTML = `
        <b>${action.name}</b> - ${action.points} pts - ${action.carbon_saved}g CO₂
        <button onclick="removeAction('${action.name}')">❌ Remove</button>`;
      container.appendChild(div);
    });

    const carbonRes = await fetch(`http://localhost:3000/carbon-saved?email=${email}`);
    if (!carbonRes.ok) {
      throw new Error('Failed to fetch carbon saved');
    }

    const carbon = await carbonRes.json();
    document.getElementById('carbonTotal').textContent = carbon.carbonSaved;
  } catch (error) {
    console.error('Error loading user actions:', error);
  }
}

async function removeAction(actionName) {
  try {
    const res = await fetch('http://localhost:3000/remove-action', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email,
        actionName
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || 'Failed to remove action');
    }

    console.log('✅ Action removed successfully');
    loadUserActions();
  } catch (error) {
    console.error('Error removing action:', error);
    alert('Failed to remove action: ' + error.message);
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

fetchActions();
loadUserActions();
