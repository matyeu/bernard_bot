const muteButtonDataFR = {
    ERROR_AUTHOR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    MUTE_NOT_FOUND: "Ce mute **n'existe pas** dans la base de données!",
    RESPONSIBLE_ERROR: "Vous n'êtes pas responsable de ce mute!",
    DESCRIPTION_LOG: "**Membre:** %user%\n**Action:** Mute\n**Expiration:** %time%\n**Raison:** %reason%",
    DESCRIPTION_USER: "Vous avez été mute du serveur `%server%` pour la raison suivante: **%reason%**",
    CASE: "Cas %case%"
};


const translateMuteButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = muteButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMuteButtonFR;
