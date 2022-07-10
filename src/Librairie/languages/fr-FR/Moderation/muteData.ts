const muteDataFR = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    BAN_ERROR: "**Vous ne pouvez pas** bannir cet utilisateur.",
    DESCRIPTION: "%user% souhaite %action% **%member%** pour la raison suivante : **%reason%**",
    MEMBER: "👤 Membre (ID)"
};


const translateMuteFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = muteDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMuteFR;
