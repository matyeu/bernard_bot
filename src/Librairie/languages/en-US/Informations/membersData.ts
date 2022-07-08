const membersDataEN = {
    TITLE: "Status of the server members: [%total%] members",
    ONLINE: "**Online**:",
    DND: "**Dnd**:",
    AFK: "**Afk**:",
    OFFLINE: "**Offline**:",
    TOTAL_MEMBERS: "`%total%` members",
};


const translateMembersEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = membersDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMembersEN;
