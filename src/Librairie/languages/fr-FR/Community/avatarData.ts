const avatarDataFR = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
};


const translateAvatarFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = avatarDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAvatarFR;
