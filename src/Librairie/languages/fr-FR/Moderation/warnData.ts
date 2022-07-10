const warnDataFR = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    WARN_ERROR: "Vous ne pouvez pas warn cet utilisateur.",
    DESCRIPTION_WARN: "%user% souhaite warn **%member%** pour la raison suivante : **%reason%**",
    DESCRIPTION_UNWARN: "%user% souhaite unwarn **%member%** pour la raison suivante : **%reason%**",
    MEMBER: "👤 Membre (ID)",
    OLD_STAFF: "Un ancien staff",
    NOT_WARNING: "Ce warn n'existe pas dans la base de données.",
    REASON_REQUIRED: "Une raison est **nécessaire** pour supprimer un warn.",
    WARN_USER_HAS: "%user% possède **%number%** warns.",
    NAME_VALUE_USER: "Warn n°%number% par \`%staff%\` le %date%:",
    WARN_SERVER_HAS: "%server% possède **%number%** warns.",
    OLD_MEMBER: "Un ancien membre",
    NAME_VALUE_SERVER: "Warn %user% par \`%staff%\` le %date%:",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**."
};


const translateWarnFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = warnDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWarnFR;
