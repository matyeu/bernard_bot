const unbanButtonDataEN = {
    ERROR_AUTHOR: "You must be **the author** of this command to use this button",
    UNBAN_NOT_FOUND: "The data for this ban was **not found**!",
    RESPONSIBLE_ERROR: "**You are not** responsible for this unban!",
    DESCRIPTION_LOG: "**Member:** %user%\n**Action:** Unban\n**Reason:** %reason%\n**Reference:** %reference%",
    CASE: "Case %case%"
};


const translateUnbanButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = unbanButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateUnbanButtonEN;
