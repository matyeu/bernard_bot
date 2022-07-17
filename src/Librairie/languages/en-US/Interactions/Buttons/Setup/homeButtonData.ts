const homeButtonDataEN = {
    OWNER_ERROR: "**You must** be the owner of **%server%** to use this command",
    TITLE: "⚙️ %bot% Configuration",
    DESCRIPTION: "Need to configure the bot? You've come to the right place!\nConsult the list of topics to learn more about %bot%.",
    PLACEHOLDER: "Select a topic",
    LABEL_GLOBAL: "Configuration general",
    DESCRIPTION_GLOBAL: "Configuration general of the bot",
    LABEL_ROLEPLAY: "Configuration role-play",
    DESCRIPTION_ROLEPLAY: "Configuration role-play of the bot",
    LABEL_TICKETS: "Configuration ticket",
    DESCRIPTION_TICKETS: "Configuration ticket of the bot",
};


const translateHomeButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = homeButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateHomeButtonEN;
