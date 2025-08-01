// 0. Mapping des images
const placeImages = {
    "appartement paris": [
        "images/places/appartement_paris/appart1.png",
        "images/places/appartement_paris/appart2.png",
        "images/places/appartement_paris/appart3.png"
    ],
    "Superbe Loft rénové": [
        "images/places/loft/loft1.png",
        "images/places/loft/loft2.png",
        "images/places/loft/loft3.png",
        "images/places/loft/loft4.png"
    ],
    "hotel nimes": [
        "images/places/hotel_nimes/nimes1.png",
        "images/places/hotel_nimes/nimes2.png",
        "images/places/hotel_nimes/nimes3.png"
    ],
    "Hotel Las Vegas": [
        "images/places/Hotel_Las_Vegas/las1.png",
        "images/places/Hotel_Las_Vegas/las2.png",
        "images/places/Hotel_Las_Vegas/las3.png"
    ],
    "Hôtel Rétro": [
        "images/places/Hôtel_Rétro/retro1.png",
        "images/places/Hôtel_Rétro/retro2.png",
        "images/places/Hôtel_Rétro/retro3.png"
    ]
};

// 1. Récupère l’ID du logement dans l’URL
function getPlaceIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// 2. Récupère le token JWT dans les cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// 3. Affiche ou masque le formulaire d’avis selon l’authentification
function handleReviewFormDisplay() {
    const token = getCookie('token');
    const addReviewSection = document.getElementById('add-review');
    if (!addReviewSection) return null;

    if (!token) {
        addReviewSection.style.display = 'none';
    } else {
        addReviewSection.style.display = 'block';
    }
    return token;
}

// 4. Va chercher les infos du logement auprès de l’API
async function fetchPlaceDetails(placeId, token = null) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ""
            }
        });
        if (response.ok) {
            const place = await response.json();
            displayPlaceDetails(place);
        } else {
            document.getElementById('place-details').innerHTML = "<p>Erreur lors de la récupération du logement.</p>";
        }
    } catch (err) {
        document.getElementById('place-details').innerHTML = "<p>Erreur de connexion à l’API.</p>";
    }
}

// 5. Affiche dynamiquement les infos du logement (images, host, etc.)
function displayPlaceDetails(place) {
    const section = document.getElementById('place-details');
    section.innerHTML = "";

    // Images principales (carrousel)
    const images = placeImages[place.title] || [];
    if (images.length > 0) {
        const carousel = document.createElement('div');
        carousel.className = 'carousel-container';
        images.forEach((src, idx) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${place.title} photo ${idx+1}`;
            img.className = 'place-carousel-img';
            img.style.display = idx === 0 ? 'block' : 'none'; // Seule la première image est visible au départ
            carousel.appendChild(img);
        });

        // Flèches pour naviguer s'il y a plusieurs images
        if (images.length > 1) {
            const left = document.createElement('button');
            left.innerHTML = "&#8592;";
            left.className = "carousel-arrow left";
            const right = document.createElement('button');
            right.innerHTML = "&#8594;";
            right.className = "carousel-arrow right";

            carousel.appendChild(left);
            carousel.appendChild(right);

            // Comportement carrousel :
            left.onclick = () => {
                let current = Array.from(carousel.querySelectorAll('.place-carousel-img')).findIndex(img => img.style.display === 'block');
                carousel.querySelectorAll('.place-carousel-img')[current].style.display = 'none';
                current = (current - 1 + images.length) % images.length;
                carousel.querySelectorAll('.place-carousel-img')[current].style.display = 'block';
            };
            right.onclick = () => {
                let current = Array.from(carousel.querySelectorAll('.place-carousel-img')).findIndex(img => img.style.display === 'block');
                carousel.querySelectorAll('.place-carousel-img')[current].style.display = 'none';
                current = (current + 1) % images.length;
                carousel.querySelectorAll('.place-carousel-img')[current].style.display = 'block';
            };
        }
        section.appendChild(carousel);
    }

    // Titre
    const title = document.createElement('h2');
    title.textContent = place.title || place.name || "Sans titre";
    section.appendChild(title);

    // Hôte (propriétaire)
    if (place.owner) {
        const host = document.createElement('p');
        host.innerHTML = `<b>Hôte :</b> ${place.owner.first_name} ${place.owner.last_name}`;
        section.appendChild(host);
    }

    // Description
    const desc = document.createElement('p');
    desc.textContent = place.description || "Aucune description.";
    section.appendChild(desc);

    // Prix
    const price = document.createElement('p');
    price.innerHTML = `<b>Prix par nuit :</b> $${place.price}`;
    section.appendChild(price);

    // Commodités
    if (place.amenities && place.amenities.length > 0) {
        const amTitle = document.createElement('h3');
        amTitle.textContent = "Commodités :";
        section.appendChild(amTitle);
        const amList = document.createElement('ul');
        place.amenities.forEach(a => {
            const li = document.createElement('li');
            li.textContent = typeof a === 'string' ? a : a.name || JSON.stringify(a);
            amList.appendChild(li);
        });
        section.appendChild(amList);
    }

    // Avis
    if (place.reviews && place.reviews.length > 0) {
        const revTitle = document.createElement('h3');
        revTitle.textContent = "Avis :";
        section.appendChild(revTitle);
        const revList = document.createElement('ul');
        place.reviews.forEach(r => {
            const li = document.createElement('li');
            li.innerHTML = `<b>${r.user || "Anonyme"}</b> : ${r.text}`;
            revList.appendChild(li);
        });
        section.appendChild(revList);
    } else {
        const noReview = document.createElement('p');
        noReview.textContent = "Aucun avis pour ce logement.";
        section.appendChild(noReview);
    }
}

// 6. Gestion du formulaire d'ajout d'avis (si connecté)
function setupReviewForm(placeId, token) {
    const form = document.getElementById('review-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const reviewText = document.getElementById('review-text').value.trim();
            if (!reviewText) return;
            try {
                const res = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}/reviews`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token ? `Bearer ${token}` : ""
                    },
                    body: JSON.stringify({ text: reviewText })
                });
                if (res.ok) {
                    alert("Avis ajouté !");
                    location.reload();
                } else {
                    alert("Erreur lors de l'ajout de l'avis !");
                }
            } catch (err) {
                alert("Erreur de connexion !");
            }
        });
    }
}

// 7. Quand la page charge, ça lance tout
document.addEventListener('DOMContentLoaded', () => {
    const placeId = getPlaceIdFromURL();
    const token = handleReviewFormDisplay(); // Affiche/masque le formulaire selon connexion

    fetchPlaceDetails(placeId, token);
    setupReviewForm(placeId, token);
});
