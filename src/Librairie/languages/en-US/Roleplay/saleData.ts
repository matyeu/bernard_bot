const saleDataEN = {
    TITLE: "Resource exchange market and currencies",
    DESCRIPTION: "Use `/sale-sale` to exchange the item for money. Or use\n`/sale-all` to sell all your resources.",
    WOOD: "%emoji% Wood",
    CHENE: "%emoji% Chêne",
    GIROLLES: "%emoji% Girolles",
    COULEMELLES: "%emoji% Coulemelles",
    IRON: "%emoji% Iron",
    COAL: "%emoji% Coal",
    CRYSTAL: "%emoji% Crystal",
    MEAT: "%emoji% Meat",
    SKIN: "%emoji% Skin",
    SALMON: "%emoji% Salmon",
    CANTARIL: "%emoji% Cantarils",
    VALUE: "%money% %emoji% each",
    DESCRIPTION_SUMMARY: "You have received **%price%** %money% thanks to the sale of your inventory.",
    NOT_ENOUGH_RESOURCE: "Oops, **you don't have enough** to sell !",
    SUCCESS: "Success, you have sold **%quantity%** %emoji% for **%price%** %money% !",
    CONTENT: "**%emoji% | Value of your inventory : %price% %money%\nThe precious stones and food are excluded from the calculation.**",
    DEFAULT: "The subcommand %subcommand% **does not exist**.",
};


const translateSaleEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = saleDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSaleEN;
