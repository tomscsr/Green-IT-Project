// Registration
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const res = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        if (res.ok) {
          alert('Registered successfully!');
          window.location.href = 'login.html';
        } else {
          alert('Registration failed');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Error during registration');
      }
    });
  }
  
  // Login
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await res.json();
          
          console.log("Response:", res);  // ➕ ajoute ça
          console.log("Data:", data);     // ➕ ajoute ça
          
          if (res.ok) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userRole', data.role);
            window.location.href = data.role === 'admin' ? 'admin.html' : 'dashboard.html';
          } else {
            alert('Login failed');
          }          
      } catch (err) {
        console.error('Error:', err);
        alert('Login error');
      }
    });
  }
  