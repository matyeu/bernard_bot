const rpsDataFR = {
    BET_ERROR_NOTHAVE: "Vous **n'avez pas** assez de pièces !",
    BET_ERROR_UP: "**Vous pouvez** miser jusqu'à **500** pièces !",
    DESCRIPTION: "Hey %user%!\n\nQu'allez-vous choisir ? *J'ai déjà fais mon choix....🤔*\n\nVotre parie: **%bet%** %emoji%",
    LABEL_ROCK: "PIERRE",
    LABEL_PAPER: "PAPIER",
    LABEL_SCISSORS: "CISEAUX",
    BUTTON_ERROR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    CASHOUT_ERROR: "**Vous devez jouer au moins 1 tour** pour retirer de l'argent",
    USER_WIN: "**Vous venez de gagner** %bet% %emoji%",
    EQUALITY: "%user% est à égalité avec %bot% : **%choiceBot%**",
    BOT_WIN: "%user% vous perdez avec le choix de %bot%: **%choiceBot%**\n\nVous perdez: **%lost%** %emoji%",
};


const translateRpsFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = rpsDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRpsFR;
