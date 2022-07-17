const selectGlobalDataFR = {
    OWNER_ERROR: "**Vous devez** être le propriétaire de **%server%** pour utiliser cette commande !",
    AUTHOR: "⚙️ %bot% Configuration",
    ENABLED: "`Activé`",
    DISABLED: "`Désactivé`",
    ADDFIELD_WELCOME: "%emoji% Bienvenue",
    ADDFIELD_GOODBYE: "%emoji% Départ",
    ADDFIELD_LOGS: "%emoji% Logs",
    ADDFIELD_ANTIBOT: "%emoji% Anti-Bot",
    ADDFIELD_TICKETS: "%emoji% Tickets",
    PLACEHOLDER: "Sélectionnez un sujet",
    LABEL_GLOBAL: "Global",
    //LANGUAGE
    LANGUAGE_CURRENT: "**La langue courante** du bot est: **Français**",
    FRENCH: "Français",
    ENGLISH: "Anglais",
    //PLUGINS
    DESCRIPTION_PLUGINS: "Sélectionnez un sujet pour **activer** ou **désactiver** un module",
    DESCRIPTION_PLUGINS_ON: "Activé le module %plugin%",
    DESCRIPTION_PLUGINS_OFF: "Désactivé le module %plugin%",
    //CHANNELS
    DESCRIPTION_CHANNELS: "Sélectionnez un sujet pour **changer** les channels d'un module",
    DESCRIPTION_CHANNELS_ROW: "Changé le channel du module %plugin%",
    ADDFIELD_LOGS_SERVER: "Logs du serveur",
    ADDFIELD_LOGS_RECRUITING: "Logs recrutement",
    ADDFIELD_LOGS_TICKETS: "Logs tickets",
    ADDFIELD_LOGS_SANCTION: "Logs sanctions",
    ADDFIELD_LOGS_PUBLIC: "Logs public",
    ADDFIELD_LOGS_MEMBERS: "Logs membres",
};


const translateSelectGlobalFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = selectGlobalDataFR[key];
    if (typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectGlobalFR;
