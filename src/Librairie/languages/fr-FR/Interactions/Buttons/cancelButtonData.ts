const cancelDataFR = {
    ERROR_AUTHOR: "Vous devez être **l'auteur** de cette commande pour utiliser ce bouton",
    CONTENT: "%emoji% | Commande **annuler.**",
};


const translateCancelFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = cancelDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCancelFR;
