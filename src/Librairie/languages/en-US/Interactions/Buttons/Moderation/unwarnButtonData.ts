const unwarnButtonDataEN = {
    ERROR_AUTHOR: "You must be **the author** of this command to use this button",
    UNWARN_NOT_FOUND: "The data for this warn was **not found**!",
    RESPONSIBLE_ERROR: "**You are not** responsible for this unwarn!",
    DESCRIPTION_LOG: "**Member:** %user%\n**Action:** Unwarn\n**Reason:** %reason%\n**Reference:** %reference%",
    CASE: "Case %case%",
    DESCRIPTION_USER: "You have been unwarned from the `%server%` server for the following reason: **%reason%**",
    NAME_SERVER: "Server",
    NAME_WARN: "Warning number"
};


const translateUnwarnButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = unwarnButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateUnwarnButtonEN;
