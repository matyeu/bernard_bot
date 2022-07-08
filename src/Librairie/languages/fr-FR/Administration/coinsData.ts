const coinsDataFR = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    ERROR_YOURSELF: "**Vous ne pouvez pas** vous mentionner pour cette commande.",
    ADD: "**%user%** vient de recevoir **%amount%** %emoji%",
    REMOVE: "**%user%** vient de perdre **%amount%** %emoji%",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**."
};


const translatecoinsFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = coinsDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatecoinsFR;
