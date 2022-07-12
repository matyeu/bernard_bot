const boxsButtonButtonFR = {
    ERROR_GAME: "Vous ne **faites pas** partie de la partie !",
    ERROR_TURN: "Ce n'est **pas votre tour** !",
    DESCRIPTION: "**%member1% vs %member2%\n\n❗️ %currentPlayer% doit jouer avec : %emoji%**",
    CONTENT_VICTORY: "❗️ | %memberWin% **a gagné** la partie contre %memberLost%.",
    CONTENT_BETWEEN: "❗️ | La partie entre %member1% et %member2% st terminée : **Match NUL**",
    CONTENT_GIVING_UP: "**%member1% vs %member2%\n❗️ %memberWin% **has won the game** as %memberLost% **is giving up the game**.",
    ERROR_LEAVE: "**Vous ne pouvez** quitter que **vos propres parties** !",
    GAME_CANCEL: "%member% **votre** partie a bien été **annulée** !",
};


const translateBoxsButtonFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = boxsButtonButtonFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBoxsButtonFR;
