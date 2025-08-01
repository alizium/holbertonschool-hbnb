console.log("places.js chargé !");

// --- OBJET placeImages (liens vers images de chaque logement) ---
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

// 1. Fonction pour lire un cookie par son nom
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Variable globale pour toutes les places (toujours la version complète)
let allPlaces = [];

// 2. Afficher dynamiquement les places dans le DOM (avec carrousel)
function displayPlaces(places) {
    const container = document.getElementById('places-container');
    container.innerHTML = "";
    if (places.length === 0) {
        container.innerHTML = "<p style='margin:40px auto;font-size:1.5em;color:#888;text-align:center;'>Aucune place trouvée pour ce prix.</p>";
        return;
    }
    places.forEach((place, i) => {
        const card = document.createElement('div');
        card.className = 'place-card';

        // Images du logement (tableau ou vide)
        const images = placeImages[place.title] || [];
        const carouselId = `carousel-${i}`;

        // HTML des images (seule la première visible au début)
        let imagesHTML = '';
        images.forEach((src, idx) => {
            imagesHTML += `<img src="${src}" alt="Image ${place.title}" 
                class="place-carousel-img" 
                style="display:${idx === 0 ? 'block' : 'none'};" 
                data-carousel="${carouselId}" 
                data-index="${idx}">`;
        });

        // Flèches si plusieurs images
        let arrowsHTML = '';
        if (images.length > 1) {
            arrowsHTML = `
                <button class="carousel-arrow left" data-carousel="${carouselId}">&#8592;</button>
                <button class="carousel-arrow right" data-carousel="${carouselId}">&#8594;</button>
            `;
        }

        card.innerHTML = `
            <div class="carousel-container" style="position:relative;">
                ${imagesHTML}
                ${arrowsHTML}
            </div>
            <h2>${place.title}</h2>
            <p>${place.description}</p>
            <p><b>Price per night:</b> $${place.price}</p>
            <a href="place.html?id=${place.id}" class="details-btn">View Details</a>
        `;
        container.appendChild(card);
    });

    // Gestion des flèches de carrousel
    document.querySelectorAll('.carousel-arrow').forEach(btn => {
        btn.addEventListener('click', function () {
            const carousel = this.dataset.carousel;
            const imgs = Array.from(document.querySelectorAll(`img[data-carousel='${carousel}']`));
            let current = imgs.findIndex(img => img.style.display === 'block');
            imgs[current].style.display = 'none';
            if (this.classList.contains('left')) {
                current = (current - 1 + imgs.length) % imgs.length;
            } else {
                current = (current + 1) % imgs.length;
            }
            imgs[current].style.display = 'block';
        });
    });
}

// 3. Fonction pour récupérer les places via l’API
async function fetchPlaces(token) {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/places/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ""
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log("PLACES DATA :", data);
            allPlaces = data;         // On stocke toutes les places ici
            displayPlaces(allPlaces); // Affiche tout au début
        } else {
            console.log("Erreur lors de la récupération des places !");
        }
    } catch (err) {
        console.log("Erreur de connexion à l'API !");
    }
}

// 4. Fonction principale pour vérifier l'authentification et lancer le fetch si connecté
function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if (!loginLink || !logoutLink) {
        console.log("Pas de login-link ou logout-link trouvé !");
        return;
    }
    if (!token) {
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
        console.log("Pas connecté, on affiche login.");
        displayPlaces([]); // Vide les places si non connecté
    } else {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
        console.log("Connecté, on cache login.");
        fetchPlaces(token);
    }
}

// 5. Fonction de filtre par prix
function filterPlacesByPrice(price) {
    if (price === "all") {
        displayPlaces(allPlaces);
    } else {
        const filtered = allPlaces.filter(place => place.price <= parseInt(price));
        displayPlaces(filtered);
    }
}

// 6. Lancer tout au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();

    // Ajoute le handler logout (ici, dans le DOMContentLoaded !)
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Efface le cookie token
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.reload(); // Recharge la page
        });
    }

    // Quand on change le filtre prix, on filtre l’affichage
    const priceSelect = document.getElementById('max-price');
    if (priceSelect) {
        priceSelect.addEventListener('change', function () {
            filterPlacesByPrice(this.value);
        });
    }
});

function getPlaceIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // renvoie "truc" si place.html?id=truc
}

// Exemple d'utilisation :
const placeId = getPlaceIdFromURL();
console.log("Place ID trouvé dans l'URL :", placeId);
