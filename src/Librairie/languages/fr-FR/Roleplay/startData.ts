const startDataFR = {
    ALREADY: "**Vous possédez déjà** un compte sur le RPG :`/connexion`",
    CONTENT: "**Bienvenue dans le RPG de %bot% %user%\nVous venez de recevoir les explications du RPG en message privé mais aussi +500 %emoji% pour bien débuter l'aventure !**"
};


const translateStartFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = startDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateStartFR;
