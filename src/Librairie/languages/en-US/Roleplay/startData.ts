const startDataEN = {
    ALREADY: "**You already** have an account on the RPG:`/connexion`",
    CONTENT: "**Welcome to the RPG of %bot% %user%\nYou have just received the explanations of the RPG in private message but also +500 %emoji% to begin the adventure well!**"
};


const translateStartEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = startDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateStartEN;
