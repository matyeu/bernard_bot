const farmDataFR = {
    COOLDOWNS: "Merci de patienter **%minutes% minute(s) %seconds%** seconde(s) pour réexécuter cette commande.",
    DONT_HAVE_ENERGY: "Vous n'avez pas assez d'énergie pour **%choice%**",
    XP_RECEIVED: "%emoji% XP reçu",
    ENERGY_NAME: "%emoji% Énergie",
    ENERGY_VALUE: "Vous avez maintenant %energy%",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**.",
    //FISHING
    ERROR_FISHING: "**Vous pensez vraiment pêcher avec vos mains nues (même nos hommes préhistoriques n'y arrivait pas...) ? Il vous faut une canne à pêche pour pouvoir commencer à pêcher !**",
    START_FISHING: "%emoji% | Vous avez commencer à **pêcher**...",
    FAILED_FISHING: "🐟 Pêche ratée %user%!",
    DESCRIPTION_FISHING: "Vous n'avez pas pu trouver de poisson !",
    SUCCESSFUL_FISHING: "🐟 Pêche réussie ! (-1 %emoji%)",
    SALMON: "%emoji% Saumons pêchés",
    CANTARIL: "%emoji% Cantaril pêchés",
    //HUNT
    ERROR_HUNT: "**Vous pensez vraiment chasser avec vos mains ? Il vous faut un arc !**",
    ERROR_ARROW: "**Vous n'avez pas de flèche pour chasser.**",
    START_HUNT: "%emoji% | Vous avez commencer à **chasser**...",
    FAILED_HUNT: "🍖 Chasse ratée %user%!",
    DESCRIPTION_HUNT: "Vous n'avez pas pu trouver de viande !",
    SUCCESSFUL_HUNT: "🍖 Chasse réussie ! (-1 %energy% & -1 %arrow%)",
    MEAT: "%emoji% Viandes collectées",
    SKIN: "%emoji% Peaux collectées",
    //PICK
    ERROR_PICK: "**Vous pensez vraiment cueillir avec vos mains nues (imaginez-vous vous faire piquer...) ? Il vous faut des gants pour pouvoir commencer à cueillir !**",
    START_PICK: "%emoji% | Vous avez commencer à **cueillir**...",
    FAILED_PICK: "🍄 Cueillette ratée %user%!",
    DESCRIPTION_PICK: "Vous n'avez pas pu trouver de champignon !",
    SUCCESSFUL_PICK: "🍄 Cueillette réussie ! (-1 %emoji%)",
    GIROLLE: "%emoji% Girolle cueillies",
    COULEMELLE: "%emoji% Coulemelle cueillies",
    //CUT
    ERROR_CUT: "**Vous pensez vraiment couper avec vos mains nues ? Il vous faut une hache pour pouvoir commencer à couper !**",
    START_CUT: "%emoji% | Vous avez commencer à **couper**...",
    FAILED_CUT: "🌲 Coupage raté %user%!",
    DESCRIPTION_CUT: "Vous n'avez pas pu trouver de bois !",
    SUCCESSFUL_CUT: "🌲 Coupage réussie ! (-1 %emoji%)",
    WOOD: "%emoji% Bois coupés",
    CHENE: "%emoji% Bois de chêne coupés"

};


const translateFarmFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = farmDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateFarmFR;
