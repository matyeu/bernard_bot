const setupDataFR = {
    OWNER_ERROR: "**Vous devez** être le propriétaire de **%server%** pour utiliser cette commande !",
    CHANNEL_ERROR: "**Vous devez** mentionner un channel valide",
    CATEGORY_ERROR: "Indiquez un **channel** et **pas une catégorie**",
    DEFAULT: "La valeur indiquée **n'est pas valide**.",
    SUCCESS: "Le salon du module %module% a été mis à jour : %channel%",
    TITLE: "⚙️ %bot% Configuration",
    DESCRIPTION: "Vous avez besoin de configurer le bot ? Vous êtes au bon endroit !\nConsultez la liste des sujets pour en savoir plus sur %bot%.",
    PLACEHOLDER: "Sélectionnez un sujet",
    LABEL_GLOBAL: "Configuration générale",
    DESCRIPTION_GLOBAL: "Configuration général du bot",
    LABEL_ROLEPLAY: "Configuration du role-play",
    DESCRIPTION_ROLEPLAY: "Configuration du role-play du bot",
    LABEL_TICKETS: "Configuration du ticket",
    DESCRIPTION_TICKETS: "Configuration des tickets du bot",
};


const translateSetupFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = setupDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSetupFR;
