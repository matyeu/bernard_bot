const refusedWeddingDataEN = {
    ERROR_AUTHOR: "Oops, **this request** in marriage **is not for you** (maybe one day, who knows ?).",
    WEDDING_LOADING: "**%emoji% | Wedding in progress for %memberRequest% & %member%...**",
    WEDDING_SUCCESS: "**%emoji% | The marriage proposal of %memberRequest% was refused by %member%... What a shame!**",
};


const translateRefusedWeddingEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = refusedWeddingDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRefusedWeddingEN;
