// Récupère le token JWT depuis les cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Redirige vers l’index si non connecté, sinon renvoie le token
function checkAuthentication() {
    const token = getCookie('token');
    if (!token) {
        window.location.href = 'index.html';
    }
    return token;
}

// Récupère l’ID du logement dans l’URL
function getPlaceIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review-form');
    const token = checkAuthentication(); // Redirige si non connecté
    const placeId = getPlaceIdFromURL();

    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const reviewText = document.getElementById('review-text').value.trim();
            const rating = document.getElementById('rating').value;

            if (!reviewText) {
                alert("Merci de remplir votre avis !");
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}/reviews`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        text: reviewText,
                        rating: rating
                    })
                });

                if (response.ok) {
                    alert("Avis ajouté avec succès !");
                    reviewForm.reset();
                    // window.location.href = `place.html?id=${placeId}`; // Décommente
                } else {
                    const data = await response.json();
                    alert("Erreur : " + (data.error || "Impossible d’ajouter l’avis"));
                }
            } catch (err) {
                alert("Erreur de connexion !");
            }
        });
    }
});
