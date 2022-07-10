const lockDataEN = {
    CHANNEL_BEING: "The channel is being **%state%**.",
    CHANNEL_STATE: "%emoji% The channel is now **%state%**",
};


const translateLockEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = lockDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateLockEN;
