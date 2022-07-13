const emojiDataFR = {
    TITLE_CREATION: "Emoji ajouté",
    TITLE_DELETE: "Emoji supprimé",
    TITLE_UPDATE: "Emoji mise à jour",
    NAME_ADDFIELD: "❗️ Nom (ID)",
    NAME_OLD_NAME: "❗️ Ancien Nome",
    NAME_NEW_NAME: "❗️ Nouveau Nome",
};


const translateEmojiFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = emojiDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateEmojiFR;
