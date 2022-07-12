const suggestionModalEN = {
    CHANNEL_SUGGESTION_NOTFOUND: "**You can't play** against yourself!",
    ERROR_SUGGESTION: "Your bugreport must be at least **\`20\` characters long**",
    DESCRIPTION: "%description%\n\n*Press the %emoji% reaction to create a thread for discussion!*",
    CONTENT: "Your suggestion **has been sent**!",
};


const translateSuggestionModalEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = suggestionModalEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSuggestionModalEN;
