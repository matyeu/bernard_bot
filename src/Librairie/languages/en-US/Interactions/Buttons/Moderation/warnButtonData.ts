const warnButtonDataEN = {
    ERROR_AUTHOR: "You must be **the author** of this command to use this button",
    WARN_NOT_FOUND: "The data for this warn was **not found**!",
    ERROR_MEMBER: "This user does **not exist** or **cannot be found**",
    RESPONSIBLE_ERROR: "**You are not** responsible for this ban!",
    DESCRIPTION_LOG: "**Member:** %user%\n**Action:** Warn\n**Reason:** %reason%",
    DESCRIPTION_USER: "You have been warned from the `%server%` server for the following reason: **%reason%**",
    NAME_SERVER: "Server",
    NAME_WARN: "Warning number",
    CASE: "Case %case%",
    FOOTER: "The warning number is to be kept for any claim"
};


const translateWarnButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = warnButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWarnButtonEN;
