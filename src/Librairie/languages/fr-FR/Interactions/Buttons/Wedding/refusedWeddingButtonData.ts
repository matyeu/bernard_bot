const refusedWeddingDataFR = {
    ERROR_AUTHOR: "Oops, **cette demande** en mariage **n'est pas pour vous** (peut-être un jour, qui sait ?).",
    WEDDING_LOADING: "**%emoji% | Mariage en cours pour %memberRequest% & %member%...**",
    WEDDING_SUCCESS: "**%emoji% | La demande en mariage de %memberRequest% a été refusée par %member%... Quel dommage !**",
};


const translateRefusedWeddingFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = refusedWeddingDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRefusedWeddingFR;
