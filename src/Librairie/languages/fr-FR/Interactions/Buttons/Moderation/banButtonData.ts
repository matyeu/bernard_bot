const banButtonDataFR = {
    ERROR_AUTHOR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    BAN_NOT_FOUND: "Ce ban **n'existe pas** dans la base de données!",
    ALWAYS: "À vie",
    RESPONSIBLE_ERROR: "Vous n'êtes pas responsable de ce ban!",
    DESCRIPTION_LOG: "**Membre:** %user%\n**Action:** Ban\n**Expiration:** %time%\n**Raison:** %reason%",
    DESCRIPTION_USER: "Vous avez été banni du serveur `%server%` pour la raison suivante: **%reason%**",
    CASE: "Cas %case%"
};


const translateBanButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = banButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBanButtonFR;
