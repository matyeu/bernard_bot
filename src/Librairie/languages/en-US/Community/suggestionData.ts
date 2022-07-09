const suggestionDataEN = {
    TITLE_MODAL: "Suggest a feature",
    TITLE_SUGGESTION: "What is the title of the suggestion?",
    DESCRIPTION_SUGGESTION: "What is the description of the suggestion?"
};


const translateBSuggestionEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = suggestionDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBSuggestionEN;
