const emojiDataEN = {
    TITLE_CREATION: "Emoji added",
    TITLE_DELETE: "Emoji deleted",
    TITLE_UPDATE: "Channel update",
    NAME_ADDFIELD: "❗️ Name (ID)",
    NAME_OLD_NAME: "❗️ Old Name",
    NAME_NEW_NAME: "❗️ New Name",
};


const translateEmojiEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = emojiDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateEmojiEN;
