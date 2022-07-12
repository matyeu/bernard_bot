const suggestionModalFR = {
    CHANNEL_SUGGESTION_NOTFOUND: "Le chalon `suggestion` est **pas configuré** ou **introuvable**",
    ERROR_SUGGESTION: "Votre suggestion doit comporter au moins **\`20\` caractères**",
    DESCRIPTION: "%description%\n\n*Appuyez sur la réaction %emoji% pour créer un fil de discussion!*",
    CONTENT: "Votre suggestion **a été envoyé**!",
};


const translateSuggestionModalFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = suggestionModalFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSuggestionModalFR;
