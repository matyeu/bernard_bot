const guildDataEN = {
    ANTIBOT: "**%user%** was kicked because it is a bot and the anti-bot is **enabled**",
    WELCOME_SERVER: "welcome to %server%",
    WELCOME: "WELCOME",
    WELCOME_DESCRIPTION: "• Username: %member%\n• Created: %createdAt%\n• Joined: %joinedAt%",
    GOODBYE_MESSAGE: "good continuation",
    GOODBYE: "GOODBYE",
    GOODBYE_DESCRIPTION: "• Username: %member%\n• Created: %createdAt%\n• Left: %left%",
    TITLE_UPDATE: "%event% update",
    MEMBER: "👤 Member (ID)",
    OLD_NICKNAME: "👤 Old Nickname",
    NEW_NICKNAME: "👤 New Nickname",
    ROLE_ADDED: "🤖 Role Added",
    ROLE_REMOVED: "🤖 Role Removed",
    OLD_NAME: "%emoji% Old Name",
    NEW_NAME: "%emoji% New Name",
    OLD_DESCRIPTION: "%emoji% Old Description",
    NEW_DESCRIPTION: "%emoji% New Description",
    OLD_LEVEL: "%emoji% Old level of verification",
    NEW_LEVEL: "%emoji% New level of verification",
    OLD_CHANNEL_SYSTEM: "%emoji% Old Channel system",
    NEW_CHANNEL_SYSTEM: "%emoji% New Channel system",
    OLD_CHANNEL_AFK: "%emoji% Old Channel AFK",
    NEW_CHANNEL_AFK: "%emoji% New Channel AFK",
    OLD_CHANNEL_PUBLIC: "%emoji% Old Channel Public",
    NEW_CHANNEL_PUBLIC: "%emoji% New Channel Public",
    OLD_CHANNEL_RULES: "%emoji% Old Channel Rules",
    NEW_CHANNEL_RULES: "%emoji% New Channel Rules",
    OLD_OWNER: "%emoji% Old Owner",
    NEW_OWNER: "%emoji% New Owner",
    FOOTER_WELCOME: "User joined",
    FOOTER_GOODBYE: "User left",

};


const translateGuildEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = guildDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateGuildEN;
