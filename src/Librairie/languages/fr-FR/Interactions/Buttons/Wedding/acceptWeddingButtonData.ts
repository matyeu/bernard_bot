const acceptWeddingDataFR = {
    ERROR_AUTHOR: "Oops, **cette demande** en mariage **n'est pas pour vous** (peut-être un jour, qui sait ?).",
    WEDDING_LOADING: "**%emoji% | Mariage en cours pour %memberRequest% & %member%...**",
    WEDDING_SUCCESS: "**%emoji% | Le mariage de %memberRequest% & %member% a été effectué ! %bot% vous souhaite que du bonheur !**",
};


const translateAcceptWeddingFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = acceptWeddingDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAcceptWeddingFR;
