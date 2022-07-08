const coinsDataEN = {
    MEMBER_ERROR: "This user does **not exist** or **cannot be found**.",
    ERROR_YOURSELF: "**You can't** mention yourself for this command",
    ADD: "**%user%** has been given **%amount%**",
    REMOVE: "**%user%** has been taken **%amount%**",
    DEFAULT: "The subcommand %subcommand% is **not valid**."
};


const translatecoinsEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = coinsDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatecoinsEN;
