const messageReactionDataFR = {
    THREAD_NAME: "%isSuggest% de %member%",
    THREAD_REASON: "Débat %isSuggest%: de %member%",
    DESCRIPTION: "*Appuyez sur la réaction %emoji% pour créer un fil de discussion!*",
    LINK: "%quoteS% *[Cliquer ici](%link%) pour rejoindre le débat ! %quoteE%*"
};


const translateMessageReactionFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = messageReactionDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMessageReactionFR;
