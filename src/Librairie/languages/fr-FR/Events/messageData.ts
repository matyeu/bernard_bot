const messageDataFR = {
    AFK_MESSAGE: "%member% est **actuellement absent(e)**.",
    AFK_MESSAGE_WITH_REASON: "%member% est **actuellement absent(e)** pour la **raison** suivante : %reason%.",
    AFK_WITHDRAWN_LOG: "%member% vient de se retiré de la liste afk.",
    AFK_WITHDRAWN: "%member% vous venez d'être **retiré** de la **liste d'afk** !"
};


const translateMessageFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = messageDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMessageFR;
