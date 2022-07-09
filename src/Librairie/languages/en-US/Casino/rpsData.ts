const rpsDataEN = {
    BET_ERROR_NOTHAVE: "You do **not have** enough coin!",
    BET_ERROR_UP: "**You can** bet up to **500** coins!",
    DESCRIPTION: "Hey %user%!\n\nWhat are you goind to choose? *I already made my choice....🤔*\n\nYour BET: **%bet%**",
    LABEL_ROCK: "ROCK",
    LABEL_PAPER: "PAPER",
    LABEL_SCISSORS: "SCISSORS",
    BUTTON_ERROR: "You must be **the author** of this command to use this button",
    CASHOUT_ERROR: "**You must play at least 1 round** to withdraw money",
    USER_WIN: "**You have withdrawn** %bet% %emoji%",
    EQUALITY: "%user% has tied with %bot% : **%choiceBot%**",
    BOT_WIN: "%user% you lose with the choice of %bot%: **%choiceBot%**\n\nYour lost: **%betCurrent%**",
};


const translateRpsEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = rpsDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRpsEN;
