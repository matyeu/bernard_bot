const banDataFR = {
    ALWAYS: "À vie",
    BAN_ERROR: "**Vous ne pouvez pas** bannir cet utilisateur.",
    DESCRIPTION: "%user% souhaite %action% **%member%** pour la raison suivante : **%reason%**",
    MEMBER: "👤 Membre (ID)"
};


const translateBanFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = banDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBanFR;
