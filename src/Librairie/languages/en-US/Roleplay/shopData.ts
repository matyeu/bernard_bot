const shopDataEN = {
    TITLE: "%emoji% Shop - %shop%",
    DESCRIPTION: "Use `/buy <id>` to buy the item you want or `/infoitem <id>` to know all about the item.\n\n%shop%",
    EQUIPMENTS: "Equipments",
    MATERIALS: "Materials",
    FOODS: "Foods",
};


const translateShopEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = shopDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateShopEN;
