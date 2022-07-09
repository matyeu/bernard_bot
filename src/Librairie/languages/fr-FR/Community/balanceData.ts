const balanceDataFR = {
    SPECIFY_USER: "Vous devez **spécifier un utilisateur**.",
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    AUTHOR: "Balance du membre : %user%",
    MONEY_VALUE: "Liquide",
    BANK_VALUE: "Banque",
    SPECIFY_MONTANT: "Vous devez **spécifier un montant**.",
    MONTANT_ENOUGH: "Vous n'avez pas assez d'argent pour ajouter ce montant.",
    MONTANT_ADDED: "Vous avez **ajouté %montant% %emoji%** à votre banque.",
    MONTANT_REMOVED: "Vous avez **retiré %montant% %emoji%** à votre banque.",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**.",
};


const translateBalanceFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = balanceDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBalanceFR;
