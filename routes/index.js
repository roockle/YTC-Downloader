// routes/index.js
const express = require('express');
const router = express.Router();

// Page d'accueil
router.get('/', (req, res) => {
    res.render('index', {
        title: 'YTC Downloader - Accueil',
        page: 'home'
    });
});

// Page des fonctionnalités
router.get('/features', (req, res) => {
    res.render('features', {
        title: 'YTC Downloader - Fonctionnalités',
        page: 'features'
    });
});

// Page de téléchargement
router.get('/telechargement', (req, res) => {    // URL en français
    res.render('download', {
        title: 'YTC Downloader - Télécharger',
        page: 'download'
    });
});

// Page À propos
router.get('/a-propos', (req, res) => {          // URL en français
    res.render('about', {
        title: 'YTC Downloader - À propos',
        page: 'about'
    });
});

// Page Support
router.get('/support', (req, res) => {
    res.render('support', {
        title: 'YTC Downloader - Support',
        page: 'support'
    });
});

// Page FAQ
router.get('/foire-aux-questions', (req, res) => {    // URL en français
    res.render('faq', {
        title: 'YTC Downloader - FAQ',
        page: 'faq'
    });
});

// Gestion des erreurs 404
router.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page non trouvée',
        page: 'error'
    });
});

module.exports = router;