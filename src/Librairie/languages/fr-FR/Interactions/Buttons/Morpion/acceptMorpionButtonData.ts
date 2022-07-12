const acceptMorpionButtonFR = {
    ERROR_YOURSELF: "Vous ne **pouvez pas** jouer contre vous-même !",
    LABEL_JOIN: "Rejoindre la partie",
    CONTENT_START: "*%member1% vs %member2%\n\n❗️ %firstPlayer% commence avec les ronds**",
};


const translateAcceptMorpionButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = acceptMorpionButtonFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAcceptMorpionButtonFR;
