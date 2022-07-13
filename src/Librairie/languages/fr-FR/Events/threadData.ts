const threadDataFR = {
    TITLE_CREATION: "Création Thread",
    TITLE_DELETE: "Suppression Thread",
    TITLE_UPDATE: "Mise à jour Thread",
    NAME_ADDFIELD: "%emoji% Nom (ID)",
    MEMBER_ADDFIELD: "👤 Membre (ID)",
    OLD_NAME: "%emoji% Ancien Nom",
    NEW_NAME: "%emoji% Nouveau Nom",
};


const translateThreadFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = threadDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateThreadFR;
