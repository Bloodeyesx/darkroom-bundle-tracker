const FEED_URL = 'https://bloodeyesx.github.io/software_feed.xml';

// 1. Fonction de mise à jour du badge
async function updateBadge() {
    try {
        const response = await fetch(FEED_URL);
        const text = await response.text();
        
        // Comptage simple des items via Regex (Car DOMParser absent en Service Worker)
        const count = (text.match(/<item>/g) || []).length;
        const countStr = count > 0 ? count.toString() : "";

        // Mise à jour visuelle du badge
        chrome.action.setBadgeText({ text: countStr });
        chrome.action.setBadgeBackgroundColor({ color: "#ef4444" }); // Rouge Darkroom
        
        console.log(`[Darkroom Background] Scan terminé : ${count} bundles trouvés.`);
    } catch (error) {
        console.error("[Darkroom Background] Erreur de scan:", error);
        chrome.action.setBadgeText({ text: "ERR" });
        chrome.action.setBadgeBackgroundColor({ color: "#000000" });
    }
}

// 2. Création de l'alarme (Scan toutes les 30 min)
chrome.alarms.create("feedCheck", { periodInMinutes: 30 });

// 3. Écouteurs d'événements
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "feedCheck") updateBadge();
});

// Scan immédiat au lancement ou à l'installation
chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);