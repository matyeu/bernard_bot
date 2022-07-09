const avatarDataEN = {
    MEMBER_ERROR: "This user does **not exist** or **cannot be found**.",
};


const translateAvatarEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = avatarDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAvatarEN;
