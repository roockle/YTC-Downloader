// server.js - Point d'entrée de l'application
const express = require('express');
const path = require('path');
const app = express();

// Configuration de base de Express
app.set('view engine', 'ejs');                              // Définit EJS comme moteur de template
app.set('views', path.join(__dirname, 'views'));           // Indique où trouver les fichiers de vue
app.use(express.static(path.join(__dirname, 'public')));   // Dossier pour les fichiers statiques
app.use(express.urlencoded({ extended: true }));           // Pour parser les données des formulaires

// Middleware de débogage pour voir les requêtes
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'YTC Downloader - Accueil',
        page: 'home'
    });
});

app.get('/telechargement', (req, res) => {
    res.render('download', { 
        title: 'YTC Downloader - Télécharger',
        page: 'download'
    });
});

app.get('/a-propos', (req, res) => {
    res.render('about', { 
        title: 'YTC Downloader - À propos',
        page: 'about'
    });
});

app.get('/support', (req, res) => {
    res.render('support', { 
        title: 'YTC Downloader - Support',
        page: 'support'
    });
});

app.get('/faq', (req, res) => {
    res.render('faq', { 
        title: 'YTC Downloader - FAQ',
        page: 'faq'
    });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page non trouvée',
        page: 'error'
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});