const kickDataEN = {
    MEMBER_ERROR: "This user does **not exist** or **cannot be found**.",
    KICK_ERROR: "**You can't** kick this user.",
    DESCRIPTION: "%user% wants to kick **%member%** for the following reason: **%reason%**",
    MEMBER: "👤 Member (ID)",
    EMBED_BEING_CREATED: "Embed being created",
    RESPONSIBLE_ERROR: "You are not responsible for this kick!",
    DESCRIPTION_LOG: "**Member:** %user%\n**Action:** Kick\n**Reason:** %reason%",
    CASE: "Case %case%",
    DESCRIPTION_USER: "You have been kicked from the \`%server%\` server for the following reason: **%reason%**",
};


const translateKickEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = kickDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateKickEN;
