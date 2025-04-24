async function loadLeaderboard() {
  const leaderboardTable = document.querySelector('#leaderboard tbody');

  try {
    const res = await fetch('http://localhost:3000/detailed-leaderboard');

    if (!res.ok) {
      throw new Error('Impossible de charger le classement');
    }

    const data = await res.json();
    console.log("✅ Données reçues pour le leaderboard :", data);

    // Vider la table actuelle
    leaderboardTable.innerHTML = '';

    // Remplir la table avec les données du classement
    data.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.rank}</td>
        <td>${user.username}</td>
        <td>${user.total_points}</td>
        <td>${Number(user.total_carbon_saved).toFixed(2)} g</td>
      `;
      leaderboardTable.appendChild(row);
    });
  } catch (error) {
    console.error('❌ Erreur lors du chargement du classement:', error);
    console.error("Error details:", error); // Add this line
    leaderboardTable.innerHTML = '<tr><td colspan="4">Impossible de charger le classement</td></tr>';
  }
}


// Call loadLeaderboard when the page loads
document.addEventListener('DOMContentLoaded', loadLeaderboard);