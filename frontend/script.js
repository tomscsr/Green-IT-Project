const form = document.getElementById('actionForm');
const leaderboard = document.querySelector('#leaderboard tbody');

const actionMap = {
  bike: 'Used a bike instead of a car',
  recycle: 'Recycled waste',
  shower: 'Took a short shower',
  light: 'Turned off unnecessary lights'
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('username').value;
  const actionKey = document.getElementById('action').value;
  const action = actionMap[actionKey];

  try {
    await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, actionKey: action })
    });

    loadLeaderboard();
  } catch (error) {
    console.error('Error submitting action:', error);
  }
});

async function removeAction(name, actionName) {
  try {
    await fetch('http://localhost:3000/remove-action', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, actionName })
    });

    loadLeaderboard();
  } catch (error) {
    console.error('Error removing action:', error);
  }
}

async function deleteUser(name) {
  try {
    await fetch('http://localhost:3000/delete-user', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    loadLeaderboard();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

async function loadLeaderboard() {
  try {
    const res = await fetch('http://localhost:3000/detailed-leaderboard');

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    leaderboard.innerHTML = '';

    for (const [username, info] of Object.entries(data)) {
      const actionsList = info.actions.map(a =>
        `${a.name} (${a.times}× = ${a.total} pts) <button onclick="removeAction('${username}', '${a.name}')">❌</button>`
      ).join('<br>');

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${username}</td>
        <td>${info.total_points}</td>
        <td>${actionsList}<br><button onclick="deleteUser('${username}')">🧨 Delete user</button></td>
      `;
      leaderboard.appendChild(row);
    }
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    leaderboard.innerHTML = '<tr><td colspan="3">⚠️ Failed to load leaderboard</td></tr>';
  }
}

loadLeaderboard();

