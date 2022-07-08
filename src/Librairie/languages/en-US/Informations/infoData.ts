const infoDataEN = {
    MEMBER_ERROR: "The user is **not in the server**.",
    ONLINE: "Online",
    DND: "Dnd",
    AFK: "Afk",
    OFFLINE: "Offline",
    DISCORD_EMPLOYEE: "Discord Staff",
    DISCORD_PARTNER: "Discord Partner",
    BUGHUNTER_LEVEL_1: "Bug hunter (Level 1)",
    BUGHUNTER_LEVEL_2: "Bug hunter (Level 2)",
    HYPESQUAD_EVENTS: "HypeSquad Events",
    HOUSE_BRAVERY: "House of Bravery",
    HOUSE_BRILLIANCE: "House of Brilliance",
    HOUSE_BALANCE: "House of Balance",
    EARLY_SUPPORTER: "Early support",
    TEAM_USER: 'Team user',
    SYSTEM: 'System',
    VERIFIED_BOT: "Certified Bot",
    VERIFIED_DEVELOPER: "Certified bot developer",
    PLAY: "**Play:**",
    LISTEN: "**Listen:**",
    WATCH: "**Watch:**",
    STREAM: "**Stream:**",
    AUTHOR: "Informations from",
    JOINED: "Joined",
    ACCOUNT: "**Account created:**"
};


const translateInfoEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = infoDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateInfoEN;
