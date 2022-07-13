const roleDataFR = {
    TITLE_CREATION: "Création Rôle",
    TITLE_DELETE: "Suppression Rôle",
    TITLE_UPDATE: "Mise à jour Rôle",
    NAME_ADDFIELD: "🎲 Nom (ID)",
};


const translateRoleFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = roleDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRoleFR;
