const unmuteButtonDataEN = {
    ERROR_AUTHOR: "You must be **the author** of this command to use this button",
    UNMUTE_NOT_FOUND: "The data for this mute was **not found**!",
    RESPONSIBLE_ERROR: "**You are not** responsible for this unmute!",
    DESCRIPTION_LOG: "**Member:** %user%\n**Action:** Unmute\n**Reason:** %reason%\n**Reference:** %reference%",
    CASE: "Case %case%",
    DESCRIPTION_USER: "You have been unmuted from the `%server%` server for the following reason: **%reason%**"
};


const translateUnmuteButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = unmuteButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateUnmuteButtonEN;
