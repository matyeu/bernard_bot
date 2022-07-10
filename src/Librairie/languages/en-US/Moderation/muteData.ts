const muteDataEN = {
    MEMBER_ERROR: "This user does **not exist** or **cannot be found**.",
    MUTE_ERROR: "**You can't** mute this user.",
    DESCRIPTION: "%user% wants to %action% **%member%** for the following reason: **%reason%**",
    MEMBER: "👤 Member (ID)",
};


const translateMuteEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = muteDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMuteEN;
