const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Dossiers clés
const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

// Créer le dossier dist s'il n'existe pas
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Liste des fichiers EJS à rendre avec leurs chemins URL correspondants
const files = [
    { file: 'index.ejs', url: 'index', data: { title: 'Accueil', page: 'home' } },
    { file: 'about.ejs', url: 'a-propos', data: { title: 'À propos', page: 'about' } },
    { file: 'download.ejs', url: 'telechargement', data: { title: 'Téléchargement', page: 'download' } },
    { file: 'faq.ejs', url: 'faq', data: { title: 'FAQ', page: 'faq' } },
    { file: 'support.ejs', url: 'support', data: { title: 'Support', page: 'support' } },
];

// Fonction pour fixer les chemins des ressources statiques et des liens
function fixPaths(content) {
    return content
        // Fix CSS, JS, et liens des images
        .replace(/href="\//g, 'href="')
        .replace(/src="\//g, 'src="')
        // Fix les liens de navigation
        .replace(/href="([^"]*?)"/g, (match, p1) => {
            // Ne pas modifier les liens externes ou avec extension
            if (p1.startsWith('http') || p1.startsWith('#') || p1.includes('.')) {
                return `href="${p1}"`;
            }
            // Traiter le lien racine
            if (p1 === '' || p1 === '/') {
                return 'href="index.html"';
            }
            // Traiter les autres liens
            return `href="${p1}.html"`;
        });
}

// Fonction pour rendre les fichiers EJS
files.forEach(({ file, url, data }) => {
    const filePath = path.join(viewsDir, file);
    const output = path.join(distDir, `${url}.html`);

    // Rendu du fichier EJS
    ejs.renderFile(filePath, data, (err, str) => {
        if (err) {
            console.error(`Erreur lors du rendu de ${file}:`, err);
            return;
        }

        // Fixer les chemins
        const updatedStr = fixPaths(str);

        // Écrire le fichier rendu dans dist
        fs.writeFileSync(output, updatedStr);
        console.log(`Fichier généré : ${output}`);
    });
});

// Copier les fichiers statiques
try {
    // S'assurer que les dossiers nécessaires existent dans dist
    ['css', 'js', 'images', 'icons'].forEach(dir => {
        const targetDir = path.join(distDir, dir);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
    });

    // Copier les fichiers
    fs.cpSync(publicDir, distDir, { 
        recursive: true,
        force: true 
    });
    console.log('Fichiers statiques copiés avec succès');
} catch (error) {
    console.error('Erreur lors de la copie des fichiers statiques :', error);
}