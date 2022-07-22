const coinflipDataEN = {
    BET_ERROR_NOTHAVE: "You do **not have** enough coin!",
    BET_ERROR_UP: "**You can** bet up to **500** coins!",
    TITLE: "Coinflip",
    DESCRIPTION: "Hey %user% your bet is **%bet%** %emoji%\nPick below what side you choose and good luck!",
    LABEL_TAIL: "TAIL",
    BUTTON_ERROR: "You must be **the author** of this command to use this button",
    CASHOUT_ERROR: "**You must play at least 1 round** to withdraw money",
    USER_WIN: "%user% has won **%bet%** %emoji%",
    EMBED_WIN: "%user% your bet is **%bet%** %emoji%\nPick below what side you choose and good luck!\n\nResult: **%result%**",
    EMBED_LOST: "%user% your lost **%bet%** %emoji%\nResult: **%result%**",
};


const translateCoinflipEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = coinflipDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCoinflipEN;
