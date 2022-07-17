const globalButtonDataFR = {
    AUTHOR: "⚙️ %bot% Configuration",
    PLACEHOLDER: "Sélectionnez un sujet",
    LABEL_HOME: "Accueil",
    DESCRIPTION_GLOBAL: "Configuration générale du bot.",
    LABEL_LANGUE: "Langue",
    DESCRIPTION_LANGUE: "Changez la langue courante",
    LABEL_PLUGINS: "Plugins",
    DESCRIPTION_PLUGINS: "Activer ou désactiver les modules",
    LABEL_CHANNELS: "Mettre à jour les channels",
    DESCRIPTION_CHANNELS: "Mettre à jour les channels des modules",
    DEFAULT: "Le sous-commande %subcommand% n'est pas valide.",
};


const translateGlobalButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = globalButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateGlobalButtonFR;
