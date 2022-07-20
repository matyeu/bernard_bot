const shopDataFR = {
    TITLE: "%emoji% Boutique - %shop%",
    DESCRIPTION: "Utilisez `/acheter <id>` pour acheter l’article souhaité ou bien `/infoitem <id>` pour savoir tout sur l'item.\n\n%shop%",
    EQUIPMENTS: "Les équipements",
    MATERIALS: "Les matériaux",
    FOODS: "Les nourritures",
};


const translateShopFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = shopDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateShopFR;
