const saleDataFR = {
    TITLE: "Marché d'échange de ressources et monnaies",
    DESCRIPTION: "Utilisez `/sale-sale` pour échanger l'article contre de l'argent. Ou bien\n`/sale-all` pour vendre toutes les ressources de votre inventaire.",
    WOOD: "%emoji% Bois",
    CHENE: "%emoji% Bois de chêne",
    GIROLLES: "%emoji% Girolles",
    COULEMELLES: "%emoji% Coulemelles",
    IRON: "%emoji% Fer",
    COAL: "%emoji% Charbons",
    CRYSTAL: "%emoji% Cristaux",
    MEAT: "%emoji% Viande",
    SKIN: "%emoji% Peaux",
    SALMON: "%emoji% Saumons",
    CANTARIL: "%emoji% Cantarils",
    VALUE: "%money% %emoji% chacun",
    DESCRIPTION_SUMMARY: "Vous avez reçu **%price%** %money% grâce à la vente de votre inventaire.",
    NOT_ENOUGH_RESOURCE: "Oops, **vous n'avez pas assez** pour vendre !",
    SUCCESS: "Succès, vous avez vendu **%quantity%** %emoji% pour **%price%** %money% !",
    CONTENT: "**%emoji% | Valeur de votre inventaire : %price% %money%\nLes pierres précieuses et les nourritures sont exclues du calcul.**",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**.",
};


const translateSaleFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = saleDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSaleFR;
