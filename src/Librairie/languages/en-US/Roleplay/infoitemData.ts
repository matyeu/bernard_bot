const infoitemDataEN = {
    ERROR_SHOP: "This item **doesn't exist** in the shop.",
    ADDFIELD_NAME: "%emoji% Price",
    ADDFIELD_VALUE: "%price% %emoji%",
    FOOTER: "You want to buy this item? Use the command /buy. Don't forget to specify the ID %item%!"
};


const translateInfoitemEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = infoitemDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateInfoitemEN;
