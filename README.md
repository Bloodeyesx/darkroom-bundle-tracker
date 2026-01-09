# 📸 Darkroom Bundle Tracker (Chrome Extension)

> "Ne ratez plus jamais un bundle logiciel. Surveillance active en style Darkroom."

![Version](https://img.shields.io/badge/Version-2.0-ef4444?style=for-the-badge)
![Chrome](https://img.shields.io/badge/Chrome-Manifest_V3-black?style=for-the-badge&logo=google-chrome)

## 🌑 À propos

Cette extension Chrome accompagne le projet [Humble Software Tracker](https://github.com/Bloodeyesx/Bloodeyesx.github.io). Elle permet de surveiller les nouvelles offres logicielles Humble Bundle directement depuis votre navigateur, sans ouvrir d'onglet.

## ✨ Fonctionnalités (v2.0)

* **🕵️ Surveillance Active :** Un script d'arrière-plan vérifie les nouveautés toutes les 30 minutes.
* **🔴 Notifications Badge :** Un compteur rouge apparaît sur l'icône quand des offres sont détectées.
* **⚡ Détection "FRESH" :** Les bundles sortis il y a moins de 24h sont mis en avant avec une bordure pulsante.
* **🔍 Filtre Instantané :** Barre de recherche intégrée pour trouver un logiciel spécifique.
* **🎨 Moteur de Thèmes :** Basculez entre le mode *Tactical Night* (Sombre) et *Office Paper* (Clair).

## 🔧 Installation Manuelle (Mode Développeur)

Cette extension n'est pas encore sur le Chrome Web Store. Voici comment l'installer :

1.  Téléchargez ce dépôt (Code > Download ZIP) et décompressez-le.
2.  Ouvrez Chrome et allez sur `chrome://extensions`.
3.  Activez le **Mode développeur** (en haut à droite).
4.  Cliquez sur **Charger l'extension non empaquetée** (Load unpacked).
5.  Sélectionnez le dossier décompressé.

## 🛠️ Stack Technique

* **Manifest V3** (Standard de sécurité Chrome actuel)
* **Service Worker** pour les tâches en arrière-plan
* **Vanilla JS** (Pas de framework lourd)
* **CSS3** pour les animations et le style "Darkroom"

## 📝 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.
