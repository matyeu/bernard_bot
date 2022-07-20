const infoitemDataFR = {
    ERROR_SHOP: "Cet article **n'existe pas** dans la boutique.",
    ADDFIELD_NAME: "%emoji% Prix",
    ADDFIELD_VALUE: "%price% %emoji%",
    FOOTER: "Vous souhaitez acheter cet article ? Utilise la commande /buy. N'oublier pas de spécifier l'ID %item%!"
};


const translateInfoitemFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = infoitemDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateInfoitemFR;
