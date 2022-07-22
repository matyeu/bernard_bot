const coinflipDataFR = {
    BET_ERROR_NOTHAVE: "Vous **n'avez pas** assez de pièces !",
    BET_ERROR_UP: "**Vous pouvez** miser jusqu'à **500** pièces !",
    TITLE: "Pile ou face",
    DESCRIPTION: "Hey %user% votre parie est de **%bet%** %emoji%\nChoisissez ci-dessous quelle est votre choix et bonne chance !",
    LABEL_TAIL: "PILE",
    BUTTON_ERROR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    CASHOUT_ERROR: "**Vous devez jouer au moins 1 tour** pour retirer de l'argent",
    USER_WIN: "%user% vous avez gagné **%bet%** %emoji%",
    EMBED_WIN: "%user% votre parie est de **%bet%** %emoji%\nChoisissez ci-dessous quelle est votre choix et bonne chance !\n\nRésultat: **%result%**",
    EMBED_LOST: "%user% vous avez perdu **%bet%** %emoji%\nRésultat: **%result%**",
};


const translateCoinflipFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = coinflipDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCoinflipFR;
