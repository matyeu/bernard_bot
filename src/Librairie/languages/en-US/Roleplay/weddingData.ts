const weddingDataEN = {
    WEDDING_NOTFOUND: "You must be **married** to execute this command !",
    MEMBER_ERROR: "This user **doesn't exist** or **was not found**.",
    ERROR_YOURSELF: "You can't **mention yourself** for this command.",
    ACCOUNT_UNDEFINED: "**%user% has not** yet a **role-play account**.",
    WEDDING_ALREADY: "One of you **is already married** !",
    WEDDING_ACCEPT: "Yes, I do!",
    WEDDING_REFUSED: "No, I don't want to.",
    SUCCESS_CONTENT: "**The proposal** was **successfully sent**!",
    CONTENT_REQUEST: "%emoji% | %memberToWedding%, %memberRequest% **are you proposing to her, do you want to marry her?**\nResponse time: **20 seconds**",
    ERROR_BANK_NOT_ENOUGH: "The common bank **doesn't have** the amount indicated (`%quantity%`)!",
    ERROR_DEPOT_NOT_ENOUGH: "**You don't have** the amount indicated (`%quantity%`) in your deposit!",
    SUCCESS_RETRAIT_CONTENT: "%quantity% %emoji% have **been withdrawn** successfully!",
    SUCCESS_DEPOT_CONTENT: "%quantity% %emoji% have **been deposited** successfully!",
    DEFAULT_TYPE: "The type %type% **doesn't exist**!",
    DESCRIPTION: "**Common account %member1%%emoji%%member2%**\n\nTo withdraw or deposit, execute the command `wedding-operation`.",
    ADDFIELD_MONEY: "%emoji% Money",
    ADDFIELD_RUBY: "%emoji% Ruby",
    ADDFIELD_GOLD: "%emoji% Gold",
    ADDFIELD_SPINELLE: "%emoji% Spinelle",
    FOOTER: "You are married since %date%",
    SUCCESS_DIVORCE_CONTENT: "**You are now single!**",
    DEFAULT: "The subcommand %subcommand% **does not exist**.",
};


const translateWeddingEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = weddingDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWeddingEN;
