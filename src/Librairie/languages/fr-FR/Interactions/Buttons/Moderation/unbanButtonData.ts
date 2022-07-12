const unbanButtonDataFR = {
    ERROR_AUTHOR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    UNBAN_NOT_FOUND: "Ce ban **n'existe pas** dans la base de données!",
    RESPONSIBLE_ERROR: "Vous n'êtes pas responsable de ce unban!",
    DESCRIPTION_LOG: "**Membre:** %user%\n**Action:** Unban\n**Raison:** %reason%\n**Reference:** %reference%",
    CASE: "Cas %case%"
};


const translateUnbanButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = unbanButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateUnbanButtonFR;
