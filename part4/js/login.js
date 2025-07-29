document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();

          // Enregistrer le token JWT dans un cookie
          document.cookie = `token=${data.access_token}; path=/`;

          // Rediriger vers la page d'accueil
          window.location.href = '/';
        } else {
          const err = await response.json();
          alert('Échec de connexion : ' + (err.error || 'Identifiants invalides'));
        }
      } catch (error) {
        alert('Erreur serveur : impossible de se connecter.');
        console.error('Erreur :', error);
      }
    });
  }
});
