const refusedExchangeButtonDataFR = {
    MEMBER_ERROR: "Oops, **cela n'est pas un échange** pour vous",
    EXCHANGE_NOTEXIST: "Oops, **cela n'est pas un échange** existant",
    SUCCESS_CONTENT: "%emoji% | %user% a **refusé** la demande d'échange de %requestUser%"
};


const translateRefusedExchangeButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = refusedExchangeButtonDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRefusedExchangeButtonFR;
