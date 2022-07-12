const unmuteButtonDataFR = {
    ERROR_AUTHOR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    UNMUTE_NOT_FOUND: "Ce mute **n'existe pas** dans la base de données!",
    RESPONSIBLE_ERROR: "Vous n'êtes pas responsable de ce unmute!",
    DESCRIPTION_LOG: "**Membre:** %user%\n**Action:** Unmute\n**Raison:** %reason%\n**Reference:** %reference%",
    CASE: "Cas %case%"
};


const translateUnmuteButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = unmuteButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateUnmuteButtonFR;
