const afkDataEN = {
    LOG_MESSAGE: "%user% has just put himself in afk.",
    REASON_MESSAGE: "You have just been put in afk.",
    REASON_MESSAGE_WITH_REASON: "You have just been put **in afk with the reason**: %reason%.",
};


const translateAfkEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = afkDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAfkEN;
