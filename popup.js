const FEED_URL = 'https://bloodeyesx.github.io/software_feed.xml';
let allBundles = [];

/**
 * UTILITAIRE : Calcul du temps écoulé
 * Retourne : "JUST NOW", "5M AGO", "2H AGO", "1D AGO"
 */
function timeAgo(dateString) {
    if (!dateString) return 'UNKNOWN';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'JUST NOW';
    if (seconds < 3600) return `${Math.floor(seconds/60)}M AGO`;
    if (seconds < 86400) return `${Math.floor(seconds/3600)}H AGO`;
    return `${Math.floor(seconds/86400)}D AGO`;
}

/**
 * UI : Génération de la liste HTML
 * Intègre la logique "FRESH" et les badges
 */
function renderList(items) {
    const container = document.getElementById('bundle-list');
    
    if (!items || items.length === 0) {
        container.innerHTML = `
            <div style="padding:40px; text-align:center; font-size:10px; color:var(--text-dim);">
                AUCUN SIGNAL DÉTECTÉ
            </div>`;
        return;
    }

    container.innerHTML = items.map(item => {
        // Logique "FRESH" : Si c'est moins de 24h (donc Minutes ou Heures)
        const isNew = item.date === 'JUST NOW' || item.date.includes('M AGO') || item.date.includes('H AGO');
        
        return `
        <a href="${item.link}" target="_blank" class="bundle-item ${isNew ? 'is-new' : ''}">
            <div class="img-wrapper">
                <img src="${item.img}" class="bundle-img" onerror="this.src='icon.png'">
                ${isNew ? '<span class="new-badge">FRESH</span>' : ''}
            </div>
            <div class="bundle-info">
                <div class="meta-row">
                    <span class="bundle-label">${isNew ? 'SIGNAL ACTIVE' : 'ARCHIVED'}</span>
                    <span class="bundle-date">${item.date}</span>
                </div>
                <div class="bundle-title">${item.title}</div>
            </div>
        </a>
    `}).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SÉLECTION DES ÉLÉMENTS ---
    const container = document.getElementById('bundle-list');
    const countLabel = document.getElementById('count');
    const searchInput = document.getElementById('search-input');
    const timeDisplay = document.getElementById('timestamp');
    const themeToggle = document.getElementById('theme-toggle-input');
    const body = document.body;

    // --- 2. GESTION DU THÈME (FIX) ---
    // On récupère la préférence sauvegardée
    const savedTheme = localStorage.getItem('theme');
    
    // Application immédiate de l'état
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.checked = true;
    } else {
        body.classList.remove('light-mode');
        if (themeToggle) themeToggle.checked = false;
    }

    // Écouteur d'événement pour le switch
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- 3. RÉCUPÉRATION DES DONNÉES (FETCH) ---
    fetch(FEED_URL)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const xmlItems = data.querySelectorAll("item");
            
            // Conversion XML -> Objets JS pour faciliter le filtrage
            allBundles = Array.from(xmlItems).map(item => {
                const description = item.querySelector("description")?.textContent || "";
                // Extraction robuste de l'image
                const imgMatch = description.match(/src="([^"]+)"/);
                const pubDate = item.querySelector("pubDate")?.textContent || "";
                
                return {
                    title: item.querySelector("title")?.textContent || "Untitled",
                    link: item.querySelector("link")?.textContent || "#",
                    img: imgMatch ? imgMatch[1] : 'icon.png', // Fallback si pas d'image
                    date: timeAgo(pubDate)
                };
            });

            // Mise à jour du compteur
            if (countLabel) {
                countLabel.textContent = `${allBundles.length} UNITÉS`;
                countLabel.style.color = "var(--accent)";
            }
            
            // Mise à jour du Timestamp en bas
            if (timeDisplay) {
                const now = new Date();
                const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
                timeDisplay.textContent = `SYNC_${timeStr}`;
            }

            // Affichage initial
            renderList(allBundles);
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = `
                <div style="padding:40px; text-align:center; color:var(--accent); font-size:10px;">
                    ERREUR DE PROTOCOLE<br>CONNEXION ÉCHOUÉE
                </div>`;
            if (countLabel) countLabel.textContent = "ERR";
        });

    // --- 4. LOGIQUE DE RECHERCHE ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            // Filtrage du tableau existant
            const filtered = allBundles.filter(b => b.title.toLowerCase().includes(val));
            renderList(filtered);
        });
    }
});