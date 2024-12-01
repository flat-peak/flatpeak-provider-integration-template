const path = require("path");
const fs = require("fs");
const locales = {};
const DEFAULT_LANG = 'en';
const preloadLocales = () => {
    const localesPath = path.join(__dirname, 'locales');
    const files = fs.readdirSync(localesPath);

    files.forEach(file => {
        const lang = path.basename(file, '.json');
        const filePath = path.join(localesPath, file);
        locales[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    });
};

const setLocalisationMiddleware = () => {
    preloadLocales();
    return function setLocalization(req, res, next) {
        const lang = req.acceptsLanguages(Object.keys(locales)) || DEFAULT_LANG;
        res.locals.labels = locales[lang];
        next();
    }
}

module.exports = {
    setLocalisationMiddleware,
    locales,
    DEFAULT_LANG
}
