const suggestionDataFR = {
    TITLE_MODAL: "Suggérer une fonctionnalité",
    TITLE_SUGGESTION: "Quel est le titre de la suggestion ?",
    DESCRIPTION_SUGGESTION: "Quel est la description de la suggestion ?"
};


const translateBSuggestionFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = suggestionDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBSuggestionFR;
