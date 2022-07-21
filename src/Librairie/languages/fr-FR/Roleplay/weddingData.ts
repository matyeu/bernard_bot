const weddingDataFR = {
    WEDDING_NOTFOUND: "Vous devez **être marier** pour exécuter cette commande !",
    ERROR_YOURSELF: "**Vous ne pouvez pas** vous mentionner pour cette commande.",
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    ACCOUNT_UNDEFINED: "**%user% n'a pas** encore de **compte role-play**.",
    WEDDING_ALREADY: "L'un de vous deux **est déjà marié** !",
    WEDDING_ACCEPT: "Oui je veux !",
    WEDDING_REFUSED: "Non, je ne veux pas.",
    SUCCESS_CONTENT: "**La demande** en mariage a **été envoyée avec succès** !",
    CONTENT_REQUEST: "%emoji% | %memberToWedding%, %memberRequest% **vous demande en mariage, souhaitez-vous l'épouser ?**\nTemps de réponse : **20 secondes**",
    ERROR_BANK_NOT_ENOUGH: "La banque commune **ne possède pas** le montant indiqué (`%quantity%`) !",
    ERROR_DEPOT_NOT_ENOUGH: "**Vous n'avez pas** le montant indiqué (`%quantity%`) dans votre dépôt !",
    SUCCESS_RETRAIT_CONTENT: "%quantity% %emoji% ont **été retirés** avec succès !",
    SUCCESS_DEPOT_CONTENT: "%quantity% %emoji% ont **été déposés** avec succès !",
    DEFAULT_TYPE: "Le type %type% **n'existe pas** !",
    DESCRIPTION: "**Compte commun %member1%%emoji%%member2%**\n\nPour un retrait ou dépôt, exécutez la commande `wedding-operation`.",
    ADDFIELD_MONEY: "%emoji% Argent",
    ADDFIELD_RUBY: "%emoji% Rubis",
    ADDFIELD_GOLD: "%emoji% Or",
    ADDFIELD_SPINELLE: "%emoji% Spinelle",
    FOOTER: "Vous êtes mariés depuis le %date%",
    SUCCESS_DIVORCE_CONTENT: "**Vous êtes désormais célibataire !**",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**.",
};


const translateWeddingFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = weddingDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWeddingFR;
