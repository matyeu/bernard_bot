const purgeDataFR = {
    NUMBER_BETWEEN: "Vous devez spécifier un nombre entre **1** et **100**.",
    MESSAGE_DELETE_SIZE: "**%messageDelete% messages** ont été supprimés.",
    BULK_DELETE: "**Vous ne pouvez pas** supprimer les messages plus vieux que **14 jours**.",
    ERROR_DELETE: "Une erreur est survenue lors de la suppression des messages.",
    NO_MESSAGE_DELETE: "Aucun message à supprimer.",
    MESSAGE_DELETE_USER: "Les messages de **%user%** ont été supprimés.",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**."
};


const translatePurgeFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = purgeDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatePurgeFR;
