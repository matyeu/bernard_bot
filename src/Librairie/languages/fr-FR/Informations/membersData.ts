const membersDataFR = {
    TITLE: "Statut des membres du serveur: [%total%] membres",
    ONLINE: "**En ligne**:",
    DND: "**Ne pas déranger**:",
    AFK: "**Absent**:",
    OFFLINE: "**Hors ligne**:",
    TOTAL_MEMBERS: "`%total%` membres",
};


const translateMembersFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = membersDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMembersFR;
