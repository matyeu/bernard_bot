const selectGlobalDataEN = {
    OWNER_ERROR: "**You must** be the owner of **%server%** to use this command",
    AUTHOR: "⚙️ %bot% Configuration",
    ENABLED: "`Enabled`",
    DISABLED: "`Disabled`",
    ADDFIELD_WELCOME: "%emoji% Welcome",
    ADDFIELD_GOODBYE: "%emoji% Goodbye",
    ADDFIELD_LOGS: "%emoji% Logs",
    ADDFIELD_ANTIBOT: "%emoji% Anti-Bot",
    ADDFIELD_TICKETS: "%emoji% Tickets",
    PLACEHOLDER: "Select a topic",
    LABEL_GLOBAL: "Global",
    //LANGUAGE
    LANGUAGE_CURRENT: "**The current language** of the bot is: **English**",
    FRENCH: "French",
    ENGLISH: "English",
    //PLUGINS
    DESCRIPTION_PLUGINS: "Select a topic to **enable** or **disable** a module",
    DESCRIPTION_PLUGINS_ON: "Activated the %plugin% module",
    DESCRIPTION_PLUGINS_OFF: "Disabled the %plugin% module",
    //CHANNELS
    DESCRIPTION_CHANNELS: "Select a topic to **change** the channels a module",
    DESCRIPTION_CHANNELS_ROW: "Changed the channel of the %plugin% module",
    ADDFIELD_LOGS_SERVER: "%emoji% Server logs",
    ADDFIELD_LOGS_RECRUITING: "%emoji% Recruiting logs",
    ADDFIELD_LOGS_TICKETS: "%emoji% Tickets logs",
    ADDFIELD_LOGS_SANCTION: "%emoji% Sanction logs",
    ADDFIELD_LOGS_PUBLIC: "%emoji% Public logs",
    ADDFIELD_LOGS_MEMBERS: "%emoji% Members logs",


};


const translateSelectGlobalEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = selectGlobalDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectGlobalEN;
