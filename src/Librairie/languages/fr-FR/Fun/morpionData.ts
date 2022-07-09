const morpionDataFR = {
    CONTENT: "❗️ | %user% est **en attente d'un partenaire** pour jouer...",
    BUTTON: "Rejoindre la partie",
};


const translateMorpionFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = morpionDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMorpionFR;
