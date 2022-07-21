const acceptWeddingDataEN = {
    ERROR_AUTHOR: "Oops, **this request** is not for you (maybe one day, who knows ?).",
    WEDDING_LOADING: "**%emoji% | Wedding in progress for %memberRequest% & %member%...**",
    WEDDING_SUCCESS: "**%emoji% | The wedding of %memberRequest% & %member% has been done ! %bot% wish you a happy life !**",
};


const translateAcceptWeddingEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = acceptWeddingDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAcceptWeddingEN;
