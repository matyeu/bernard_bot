const lockDataFR = {
    CHANNEL_BEING: "Le channel est entrain d'être **%state%**.",
    CHANNEL_STATE: "%emoji% Le channel est maintenant **%state%**",
};


const translateLockFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = lockDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateLockFR;
