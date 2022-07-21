const profilDataFR = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    ACCOUNT_UNDEFINED: "**%user% n'a pas encore créé un **compte de role-play**.",
    AUTHOR: "Profil de %user%",
    ADDFIELD_LEVEL: "%emoji% Level",
    ADDFIELD_MONEY: "%emoji% Argent",
    ADDFIELD_BANK: "%emoji% Banque",
    ADDFIELD_LIFE: "%emoji% Points de vie",
    ADDFIELD_ENERGY: "%emoji% Énergie",
    ADDFIELD_HYGIENE: "%emoji% Hygiène",
    ADDFIELD_WEDDING: "%emoji% Marié(e)",
    ADDFIELD_VALUE_WEDDING: "Oui (%user% & %partner%)",
    ADDFIELD_POWER: "%emoji% Puissance",
    ADDFIELD_VALUE_POWER: "%emoji% Attaque: **%attack%**\n%emoji% Défense: **%defense%**",
    FOOTER: "ID RPG : %uui%\n%user% a rejoint l'aventure le %date%",
};


const translateProfilFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = profilDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateProfilFR;
