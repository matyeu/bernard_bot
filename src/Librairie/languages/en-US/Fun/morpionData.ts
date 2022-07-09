const morpionDataEN = {
    CONTENT: "❗️ | %user% is **waiting for a play** partner...",
    BUTTON: "Join the game",
};


const translateMorpionEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = morpionDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMorpionEN;
