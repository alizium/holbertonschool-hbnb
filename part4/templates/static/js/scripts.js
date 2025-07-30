document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = loginForm.elements['email'].value;
            const password = loginForm.elements['password'].value;

            try {
                const response = await fetch('http://localhost:5001/api/v1/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    document.cookie = `token=${data.access_token}; path=/; max-age=86400`;
                    window.location.href = 'index.html';
                } else {
                    let msg = 'Invalid credentials';
                    try {
                        const errData = await response.json();
                        if (errData && errData.message) msg = errData.message;
                    } catch {}
                    showError(msg);
                }
            } catch (err) {
                showError("Erreur de connexion au serveur.");
            }
        });
    }

    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = "block";
        } else {
            alert(message);
        }
    }
});
