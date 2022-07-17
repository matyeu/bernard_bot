const selectPluginsDataFR = {
    OWNER_ERROR: "**Vous devez** être le propriétaire de **%server%** pour utiliser cette commande !",
    AUTHOR: "⚙️ %bot% Configuration",
    DESCRIPTION_PLUGINS: "Sélectionnez un sujet pour **activer** ou **désactiver** un module",
    ENABLED: "`Activé`",
    DISABLED: "`Désactivé`",
    ADDFIELD_WELCOME: "%emoji% Bienvenue",
    ADDFIELD_GOODBYE: "%emoji% Départ",
    ADDFIELD_LOGS: "%emoji% Logs",
    ADDFIELD_ANTIBOT: "%emoji% Anti-Bot",
    ADDFIELD_TICKETS: "%emoji% Tickets",
    PLACEHOLDER: "Sélectionnez un sujet",
    DESCRIPTION_PLUGINS_ON: "Activé le module %plugin%",
    DESCRIPTION_PLUGINS_OFF: "Désactivé le module %plugin%",
    DEFAULT: "La sous-commande %subcommand% n'est pas valide.",
    LABEL_GLOBAL: "Global",
    SUCCESS: "%emoji% | Le module `%plugin%` **a été** %status%.",
};


const translateSelectPluginsFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = selectPluginsDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectPluginsFR;
