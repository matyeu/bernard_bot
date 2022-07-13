const threadDataEN = {
    TITLE_CREATION: "Thread creation",
    TITLE_DELETE: "Thread delete",
    TITLE_UPDATE: "Thread update",
    NAME_ADDFIELD: "%emoji% Name (ID)",
    MEMBER_ADDFIELD: "👤 Member (ID)",
    OLD_NAME: "%emoji% Old Name",
    NEW_NAME: "%emoji% New Name",
};


const translateThreadEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = threadDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateThreadEN;
