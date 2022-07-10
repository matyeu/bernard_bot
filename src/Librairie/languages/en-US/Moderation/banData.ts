const banDataEN = {
    ALWAYS: "Always",
    BAN_ERROR: "**You can't** ban this user.",
    DESCRIPTION: "%user% wants to %action% **%member%** for the following reason: **%reason%**",
    MEMBER: "👤 Member (ID)"
};


const translateBanEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = banDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBanEN;
