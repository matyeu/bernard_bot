const profilDataEN = {
    MEMBER_ERROR: "This user does **not exist** or **cannot be found**.",
    ACCOUNT_UNDEFINED: "**%user% has not** yet created a **role-play account**.",
    AUTHOR: "Profil of %user%",
    ADDFIELD_LEVEL: "%emoji% Level",
    ADDFIELD_MONEY: "%emoji% Money",
    ADDFIELD_BANK: "%emoji% Bank",
    ADDFIELD_LIFE: "%emoji% Life point",
    ADDFIELD_ENERGY: "%emoji% Energy",
    ADDFIELD_HYGIENE: "%emoji% Hygiene",
    ADDFIELD_WEDDING: "%emoji% Married",
    ADDFIELD_VALUE_WEDDING: "Yes (%user% & %partner%)",
    ADDFIELD_POWER: "%emoji% Power",
    ADDFIELD_VALUE_POWER: "%emoji% Attack: **%attack%**\n%emoji% Defense: **%defense%**",
    FOOTER: "ID RPG : %uui%\n%user% joined the adventure on %date%",
};


const translateProfilEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = profilDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateProfilEN;
