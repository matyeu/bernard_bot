const frenchButtonDataEN = {
    OWNER_ERROR: "**You must** be the owner of **%server%** to use this command",
    AUTHOR: "⚙️ %bot% Configuration",
    FRENCH: "Français",
    ENGLISH: "Anglais",
    LANGUAGE_CURRENT: "**La langue courante** du bot est: **Français**",
    CONTENT: "%emoji% | Langue mise à jour en **Français**",
};


const translateFrenchButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = frenchButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateFrenchButtonEN;
