const warnButtonDataFR = {
    ERROR_AUTHOR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    WARN_NOT_FOUND: "Ce warn **n'existe pas** dans la base de données!",
    ERROR_MEMBER: "Cet utilisateur n'existe pas ou n'a pas été trouvé",
    RESPONSIBLE_ERROR: "**Vous n'êtes pas** responsable de ce warn!",
    CONTENT: "Le warn de **%user%** a été envoyé.",
    DESCRIPTION_LOG: "**Membre:** %user%\n**Action:** Warn\n**Raison:** %reason%",
    DESCRIPTION_USER: "Vous avez été warn du serveur `%server%` pour la raison suivante : **%reason%**",
    NAME_SERVER: "Serveur",
    NAME_WARN: "Numéro du warn",
    CASE: "Cas %case%",
    FOOTER: "Le numéro du warn est à garder pour toute réclamation"
};


const translateWarnButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = warnButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWarnButtonFR;
