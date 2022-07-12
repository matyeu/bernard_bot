const selectHelpDataEN = {
    AUTHOR: "❓ Getting help",
    TITLE_GENERAL: "🎈 The list of orders 🎈",
    DESCRIPTION_LINK: "**• Link support :** %discord%\n**• Link github bot :** %bot%\n**• Link github site :** %site%",
    DEFAULT: "The subcommand %subcommand% is **not valid**."
};


const translateSelectHelpEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = selectHelpDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectHelpEN;
