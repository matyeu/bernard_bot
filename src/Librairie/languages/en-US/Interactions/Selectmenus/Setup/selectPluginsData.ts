const selectPluginsDataEN = {
    OWNER_ERROR: "**You must** be the owner of **%server%** to use this command",
    AUTHOR: "⚙️ %bot% Configuration",
    DESCRIPTION_PLUGINS: "Select a topic to **enable** or **disable** a module",
    ENABLED: "`Enabled`",
    DISABLED: "`Disabled`",
    ADDFIELD_WELCOME: "%emoji% Welcome",
    ADDFIELD_GOODBYE: "%emoji% Goodbye",
    ADDFIELD_LOGS: "%emoji% Logs",
    ADDFIELD_ANTIBOT: "%emoji% Anti-Bot",
    ADDFIELD_TICKETS: "%emoji% Tickets",
    PLACEHOLDER: "Select a topic",
    DESCRIPTION_PLUGINS_ON: "Activated the %plugin% module",
    DESCRIPTION_PLUGINS_OFF: "Disabled the %plugin% module",
    DEFAULT: "The subcommand %subcommand% is **not valid**.",
    LABEL_GLOBAL: "Global",
    SUCCESS: "%emoji% | The `%plugin%` module **has been** %status%.",
};


const translateSelectPluginsEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = selectPluginsDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectPluginsEN;
