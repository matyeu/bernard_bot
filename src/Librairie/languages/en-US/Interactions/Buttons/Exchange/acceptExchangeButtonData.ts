const acceptExchangeButtonDataEN = {
    MEMBER_ERROR: "Oops, **this secure exchange** is not for you",
    EXCHANGE_NOTEXIST: "Oops, **this secure exchange** is not defined",
    SUCCESS_CONTENT: "%emoji% | %user% has **accepted** %requestUser% exchange request"
};


const translateAcceptExchangeButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = acceptExchangeButtonDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAcceptExchangeButtonEN;
