const setupDataEN = {
    OWNER_ERROR: "**You must** be the owner of **%server%** to use this command",
    CHANNEL_ERROR: "**You must** mention a valid channel",
    CATEGORY_ERROR: "Indicate a **channel** and **not a category**",
    DEFAULT: "The value indicated **is not valid**.",
    SUCCESS: "The channel of the module %module% has been updated : %channel%",
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


const translateSetupEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = setupDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSetupEN;
