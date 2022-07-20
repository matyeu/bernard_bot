const refusedExchangeButtonDataEN = {
    MEMBER_ERROR: "Oops, **this secure exchange** is not for you",
    EXCHANGE_NOTEXIST: "Oops, **this secure exchange** is not defined",
    SUCCESS_CONTENT: "%emoji% | %user% has **refused** %requestUser% exchange request"
};


const translateRefusedExchangeButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = refusedExchangeButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRefusedExchangeButtonEN;
