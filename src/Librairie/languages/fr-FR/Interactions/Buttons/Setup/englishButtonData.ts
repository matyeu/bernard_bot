const englishButtonDataFR = {
    OWNER_ERROR: "**Vous devez** être le propriétaire de **%server%** pour utiliser cette commande !",
    AUTHOR: "⚙️ %bot% Configuration",
    FRENCH: "French",
    ENGLISH: "English",
    LANGUAGE_CURRENT: "**The current language** of the bot is: **English**",
    CONTENT: "%emoji% | Language updated to **English**",
};


const translateEnglishButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = englishButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateEnglishButtonFR;
