const messageReactionDataEN = {
    THREAD_NAME: "%isSuggest% of %member%",
    THREAD_REASON: "Débat son the %isSuggest%: of %member%",
    DESCRIPTION: "*Press the %emoji% reaction to create a thread for discussion!*",
    LINK: "%quoteS% *[Click here](%link%) to join the debate! %quoteE%*"
};


const translateMessageReactionEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = messageReactionDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMessageReactionEN;
