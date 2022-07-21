const selectHelpDataFR = {
    AUTHOR: "❓ Obtenir de l'aide",
    TITLE_GENERAL: "🎈 La liste des commandes 🎈",
    TITLE_ROLEPLAY: "%emoji% La liste des commandes %emoji%",
    DESCRIPTION_LINK: "**• Lien support :** %discord%\n**• Lien github bot :** %bot%\n**• Lien github site :** %site%",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**."
};


const translateSelectHelpFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = selectHelpDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectHelpFR;
