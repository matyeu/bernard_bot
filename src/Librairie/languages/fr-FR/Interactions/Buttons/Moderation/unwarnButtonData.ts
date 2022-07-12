const unwarnButtonDataFR = {
    ERROR_AUTHOR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    UNWARN_NOT_FOUND: "Ce warn **n'existe pas** dans la base de données!",
    RESPONSIBLE_ERROR: "Vous n'êtes pas responsable de ce unmute!",
    DESCRIPTION_LOG: "**Membre:** %user%\n**Action:** Unwarn\n**Raison:** %reason%\n**Reference:** %reference%",
    CASE: "Cas %case%",
    DESCRIPTION_USER: "Vous avez été unwarn sur le serveur `%server%` pour la raison suivante : %reason%",
    NAME_SERVER: "Serveur",
    NAME_WARN: "Numéro du warn"
};


const translateUnwarnButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = unwarnButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateUnwarnButtonFR;
