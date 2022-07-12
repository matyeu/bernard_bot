const acceptMorpionButtonEN = {
    ERROR_YOURSELF: "**You can't play** against yourself!",
    LABEL_JOIN: "Join the game",
    CONTENT_START: "*%member1% vs %member2%\n\n❗️ %firstPlayer% starts with the circles**",
};


const translateAcceptMorpionButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = acceptMorpionButtonEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAcceptMorpionButtonEN;
