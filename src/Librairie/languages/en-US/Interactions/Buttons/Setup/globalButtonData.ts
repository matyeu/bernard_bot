const globalButtonDataEN = {
    OWNER_ERROR: "**You must** be the owner of **%server%** to use this command",
    AUTHOR: "⚙️ %bot% Configuration",
    PLACEHOLDER: "Select a topic",
    LABEL_HOME: "Home",
    DESCRIPTION_GLOBAL: "Configuration general of the bot.",
    LABEL_LANGUE: "Language",
    DESCRIPTION_LANGUE: "Change current language",
    LABEL_PLUGINS: "Modules",
    DESCRIPTION_PLUGINS: "Enable or disable modules",
    LABEL_CHANNELS: "Update channels",
    DESCRIPTION_CHANNELS: "Update modules channels",
    DEFAULT: "The subcommand %subcommand% is **not valid**.",
};


const translateGlobalButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = globalButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateGlobalButtonEN;
