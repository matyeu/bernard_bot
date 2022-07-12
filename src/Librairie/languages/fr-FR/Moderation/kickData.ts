const kickDataFR = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    KICK_ERROR: "**Vous ne pouvez pas** kick cet utilisateur.",
    DESCRIPTION: "%user% souhaite kick **%member%** pour la raison suivante : **%reason%**",
    MEMBER: "👤 Member (ID)",
    EMBED_BEING_CREATED: "Embed en cours de création",
    RESPONSIBLE_ERROR: "Vous n'êtes pas responsable de ce kick!",
    DESCRIPTION_LOG: "**Membre:** %user%\n**Action:** Kick\n**Raison:** %reason%",
    CASE: "Cas %case%",
    DESCRIPTION_USER: "Vous avez été kick du serveur `%server%` pour la raison suivante : **%reason%**",
};


const translateKickFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = kickDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateKickFR;
