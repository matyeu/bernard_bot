const muteButtonDataEN = {
    ERROR_AUTHOR: "You must be **the author** of this command to use this button",
    MUTE_NOT_FOUND: "The data for this mute was **not found**!",
    ALWAYS: "Always",
    RESPONSIBLE_ERROR: "**You are not** responsible for this mute!",
    DESCRIPTION_LOG: "**Member:** %user%\n**Action:** Mute\n**Expiration:** %time%\n**Reason:** %reason%",
    DESCRIPTION_USER: "You have been muted from the `%server%` server for the following reason: **%reason%**"
};


const translateMuteButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = muteButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMuteButtonEN;
