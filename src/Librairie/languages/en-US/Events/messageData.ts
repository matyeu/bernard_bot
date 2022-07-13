const messageDataEN = {
    AFK_MESSAGE: "%member% is **currently absent**.",
    AFK_MESSAGE_WITH_REASON: "%member% **is currently absent** for the following **reason**: %reason%.",
    AFK_WITHDRAWN_LOG: "%member% has just withdrawn from the afk list.",
    AFK_WITHDRAWN: "%member% you have just been **removed** from the **afk list**!"
};


const translateMessageEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = messageDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMessageEN;
