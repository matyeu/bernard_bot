const roleDataEN = {
    TITLE_CREATION: "Role creation",
    TITLE_DELETE: "Role delete",
    TITLE_UPDATE: "Role update",
    NAME_ADDFIELD: "🎲 Name (ID)",
};


const translateRoleEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = roleDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRoleEN;
