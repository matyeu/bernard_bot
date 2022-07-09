const balanceDataEN = {
    SPECIFY_USER: "You must **specify a user**",
    MEMBER_ERROR: "This user does **not exist** or **cannot be found**.",
    AUTHOR: "Balance of the member: %user%",
    MONEY_VALUE: "Money",
    BANK_VALUE: "Bank",
    SPECIFY_MONTANT: "You must **specify a montant**.",
    MONTANT_ENOUGH: "You don't have enough money to add this amount.",
    MONTANT_ADDED: "You have **added %montant% %emoji%** to your bank.",
    MONTANT_REMOVED: "You have **removed %montant% %emoji%** from your bank.",
    DEFAULT: "The subcommand %subcommand% is **not valid**."
};


const translateBalanceEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = balanceDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBalanceEN;
