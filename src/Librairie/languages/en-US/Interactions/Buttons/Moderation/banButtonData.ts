const banButtonDataEN = {
    ERROR_AUTHOR: "You must be **the author** of this command to use this button",
    BAN_NOT_FOUND: "The data for this ban was **not found**!",
    ALWAYS: "Always",
    RESPONSIBLE_ERROR: "**You are not** responsible for this ban!",
    DESCRIPTION_LOG: "**Member:** %user%\n**Action:** Ban\n**Expiration:** %time%\n**Reason:** %reason%",
    DESCRIPTION_USER: "You have been banned from the `%server%` server for the following reason: **%reason%**",
    CASE: "Case %case%"
};


const translateBanButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = banButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBanButtonEN;
