const farmDataEN = {
    COOLDOWNS: "Please wait **%minutes% minute(s) %seconds%** second(s) to run this command again.",
    DONT_HAVE_ENERGY: "You don't have enough energy to **%choice%**",
    XP_RECEIVED: "%emoji% XP received",
    ENERGY_NAME: "%emoji% Energy",
    ENERGY_VALUE: "You now have %energy%",
    DEFAULT: "The subcommand %subcommand% is **not valid**.",
    //FISHING
    ERROR_FISHING: "**You really think you can fish with your bare hands (even our prehistoric men couldn't do it...)? You need a fishing rod to start fishing!**",
    START_FISHING: "%emoji% | You have started **fishing**...",
    FAILED_FISHING: "🐟 Failed fishing %user%!",
    DESCRIPTION_FISHING: "You could not find fish!",
    SUCCESSFUL_FISHING: "🐟 Successful fishing! (-1 %emoji%)",
    SALMON: "%emoji% Caught salmon",
    CANTARIL: "%emoji% Caught cantaril",
    //HUNT
    ERROR_HUNT: "**Do you really think you can hunt with your hands? You need a bow!**",
    ERROR_ARROW: "**You don't have an arrow to hunt with**",
    START_HUNT: "%emoji% | You started **hunting**...",
    FAILED_HUNT: "🍖 Failed hunt %user%!",
    DESCRIPTION_HUNT: "You could not find meat!",
    SUCCESSFUL_HUNT: "🍖 Successful hunt! (-1 %energy% & -1 %arrow%)",
    MEAT: "%emoji% Collected meats",
    SKIN: "%emoji% Collected skins",
    //PICK
    ERROR_PICK: "**Thinking about picking with your bare hands (imagine getting stung...)? You need gloves to start picking !**",
    START_PICK: "%emoji% | You have started to **pick**...",
    FAILED_PICK: "🍄 Failed pickup %user%!",
    DESCRIPTION_PICK: "You could not find a mushroom!",
    SUCCESSFUL_PICK: "🍄 Successful picking! (-1 %emoji%)",
    GIROLLE: "%emoji% Girolle picked",
    COULEMELLE: "%emoji% Coulemelle picked",
    //CUT
    ERROR_CUT: "**Are you really thinking about cutting with your bare hands? You need an axe to start cutting!**",
    START_CUT: "%emoji% | You have started to **cut**...",
    FAILED_CUT: "🌲 Failed cut %user%!",
    DESCRIPTION_CUT: "You couldn't find any wood!",
    SUCCESSFUL_CUT: "🌲 Successful cutting! (-1 %emoji%)",
    WOOD: "%emoji% Cut wood",
    CHENE: "%emoji% Cut oak wood"

};


const translateFarmEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = farmDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateFarmEN;
