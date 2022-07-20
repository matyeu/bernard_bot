const acceptExchangeButtonDataFR = {
    MEMBER_ERROR: "Oops, **cela n'est pas un échange** pour vous",
    EXCHANGE_NOTEXIST: "Oops, **cela n'est pas un échange** existant",
    SUCCESS_CONTENT: "%emoji% | %user% a **accepté** la demande d'échange de %requestUser%"
};


const translateAcceptExchangeButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = acceptExchangeButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAcceptExchangeButtonFR;
