const afkDataFR = {
    LOG_MESSAGE: "%user% vient de se mettre en afk.",
    REASON_MESSAGE: "Vous venez d'être mis en afk.",
    REASON_MESSAGE_WITH_REASON: "Vous venez d'être mis **en afk pour la raison** : %reason%",
};


const translateAfkFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = afkDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAfkFR;
