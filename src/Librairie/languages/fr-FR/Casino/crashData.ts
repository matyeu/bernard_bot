const crashDataFR = {
    BET_ERROR_NOTHAVE: "Vous **n'avez pas** assez de pièces !",
    BET_ERROR_UP: "**Vous pouvez** miser jusqu'à **500** pièces !",
    BET: "**%user%** votre parie est de %bet%",
    HOW_TO_PLAY: "Comment jouer ?",
    BUTTON_ERROR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    VALUE_HOW_TO_PLAY: "stop: Cliquer sur stop avant de crash",
    BET_LOST: "**%user%** vous venez de perdre %bet%",
    BET_WON: "**%user%** vous venez de gagner %bet%"
};


const translateCrashFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = crashDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCrashFR;
