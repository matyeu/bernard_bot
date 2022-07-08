const helpDataEN = {
    TITLE: "❓ Getting help",
    DESCRIPTION: `You need information ? You've come to the right place !\nConsult the list of topics to learn more about`,
    PLACEHOLDER: "Select a topic",
    LABEL_GENERAL: "General commands",
    DESCRIPTION_GENERAL: "Have the list of general orders",
    LABEL_LINK: "Useful links",
    DESCRIPTION_LINK: "Have a list of useful links",
};


const translateHelpEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = helpDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateHelpEN;
