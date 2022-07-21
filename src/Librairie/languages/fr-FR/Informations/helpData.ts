const helpDataFR = {
    TITLE: "❓ Obtenir de l'aide",
    DESCRIPTION: `Vous avez besoin d'informations ? Vous êtes au bon endroit ! \nConsulte la liste des sujets pour en savoir plus sur`,
    PLACEHOLDER: "Sélectionner un sujet",
    LABEL_GENERAL: "Commandes générales",
    DESCRIPTION_GENERAL: "Avoir la liste des commandes générales",
    LABEL_ROLEPLAY: "Commandes roleplay",
    DESCRIPTION_ROLEPLAY: "Avoir la liste des commandes roleplay",
    LABEL_LINK: "Liens utiles",
    DESCRIPTION_LINK: "Avoir la liste des liens utiles",
};


const translateHelpFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = helpDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateHelpFR;
