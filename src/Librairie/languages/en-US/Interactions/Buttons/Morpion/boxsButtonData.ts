const boxsButtonButtonEN = {
    ERROR_GAME: "You are **not part** of the game!",
    ERROR_TURN: "It's **not your turn**!",
    DESCRIPTION: "**%member1% vs %member2%\n\n❗️ %currentPlayer% must play with: %emoji%**",
    CONTENT_VICTORY: "❗️ | %memberWin% **won** the game against %memberLost%.",
    CONTENT_BETWEEN: "❗️ | The game between %member1% and %member2% is over : **DRAWN MATCH**",
    CONTENT_GIVING_UP: "**%member1% vs %member2%\n❗️ %memberWin% **has won the game** as %memberLost% **is giving up the game**.",
    ERROR_LEAVE: "**You can** only leave **your own games**!",
    GAME_CANCEL: "%member% your game has been **cancelled**!",
};


const translateBoxsButtonEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = boxsButtonButtonEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBoxsButtonEN;
