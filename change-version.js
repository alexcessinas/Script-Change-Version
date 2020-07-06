const fs = require("fs");
const path = require("path");
const semver = require("semver");


// Recupere la version dans le terminal
const inputVersionPackage = process.argv[2];
// Le chemin du fichier "package.json"
const packagePath = path.resolve(__dirname, "package.json");
// Contenu de mon fichier en JSON
const contentJSON = JSON.parse(fs.readFileSync(packagePath));

// Contrôle si la nouvelle version est présente
if (!inputVersionPackage) {
    throw new Error("La version n'est pas présente !");
}

// Teste si l'input est valide 
if (!semver.valid(inputVersionPackage)) {
  throw new Error("La version n'est pas valide !");
}

// Contrôle si la nouvelle version n'est pas égale à la précédente
if (inputVersionPackage == contentJSON.version) {
    throw new Error("La version est la même que la précédente !");
}

// Attribution de la valeur d'entrer du terminal
contentJSON.version = inputVersionPackage;
// Ecriture du fichier avec la route et le contenu du fichier
fs.writeFileSync(packagePath, JSON.stringify(contentJSON, null, "\t"));

console.log("Version : "+contentJSON.version);
