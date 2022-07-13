const interactionDataFR = {
    CONTENT_MAINTENANCE_COMMAND: "Cette commande est **en cours de maintenance**...",
    CONTENT_PERMISSION: "**Vous n'avez pas** la permission d'utiliser cette commande !",
    CONTENT_RPG: "**Pas de profil RPG détecté: \`/start\`**",
    CONTENT_COOLDOWNS: "Merci de patienter **%time%** pour utiliser cette commande.",
};


const translateInteractionFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = interactionDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateInteractionFR;
