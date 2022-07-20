const exchangeDataFR = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    ACCOUNT_UNDEFINED: "**%user% n'a pas** encore créé un **compte de role-play**.",
    QUANTITY_ERROR_NOTHAVE: "Oops, **il vous manque** \`%quantity%\` %emoji% **pour valider** cette échange!",
    USER_ERROR_NOTHAVE: "Oops, **il manque** %quantity% %emoji% à %user% pour valider cette échange!",
    SUCCESS_CONTENT: "%emoji% | La demande d'échange **a été envoyée avec succès**.",
    ACCEPT: "Oui",
    REFUSED: "Non",
    EXCHANGE_CONTENT: "%emoji% | %userToExchange%, %user% **vous demande `%quantity%` %emoji% pour la somme de `%money%` %moneyEmoji%, acceptez-vous?**\nTemps de réponse: **20 secondes**"
};


const translateExchangeFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = exchangeDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateExchangeFR;
