// ecoactions.js
async function loadActions() {
    const res = await fetch('http://localhost:3000/actions');
    const data = await res.json();
    const container = document.getElementById('actionsList');
    data.forEach(action => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${action.name}</h3>
        <p>${action.description}</p>
        <p><b>Points:</b> ${action.points}</p>
        <p><b>Carbon saved:</b> ${action.carbon_saved}g CO₂e</p>
        <hr>`;
      container.appendChild(div);
    });
  }
  
  loadActions();
  