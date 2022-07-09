const crashDataEN = {
    BET_ERROR_NOTHAVE: "You do **not have** enough coin!",
    BET_ERROR_UP: "**You can** bet up to **500** coins!",
    BET: "%user% you have bet %bet%",
    HOW_TO_PLAY: "How to play?",
    BUTTON_ERROR: "You must be **the author** of this command to use this button",
    VALUE_HOW_TO_PLAY: "stop: To stop before crash",
    BET_LOST: "%user% you have lost %bet%",
    BET_WON: "%user% you have won %bet%",
};


const translateCrashEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = crashDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCrashEN;
