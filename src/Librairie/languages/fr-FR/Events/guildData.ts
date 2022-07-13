const guildDataFR = {
    ANTIBOT: "**%user%** a été kick car il s'agit d'un bot et l'anti-bot est **activé**",
    WELCOME_SERVER: "bienvenue sur %server%",
    WELCOME: "BIENVENUE",
    WELCOME_DESCRIPTION: "• Membre : %member%\n• Crée le : %createdAt%\n• Rejoint le : %joinedAt%",
    GOODBYE_MESSAGE: "bonne continuation",
    GOODBYE: "DÉPART",
    GOODBYE_DESCRIPTION: "• Membre : %member%\n• Crée le : %createdAt%\n• Quitté le : %left%",
    TITLE_UPDATE: "%event% mise à jour",
    MEMBER: "👤 Membre (ID)",
    OLD_NICKNAME: "👤 Ancien surnom",
    NEW_NICKNAME: "👤 Nouveau surnom",
    ROLE_ADDED: "🤖 Role ajouté",
    ROLE_REMOVED: "🤖 Role retiré",
    OLD_NAME: "%emoji% Ancien Nom",
    NEW_NAME: "%emoji% Nouveau Nom",
    OLD_DESCRIPTION: "%emoji% Ancienne Description",
    NEW_DESCRIPTION: "%emoji% Nouvelle Description",
    OLD_LEVEL: "%emoji% Ancien level de vérification",
    NEW_LEVEL: "%emoji% New level of vérification",
    OLD_CHANNEL_SYSTEM: "%emoji% Ancien Channel system",
    NEW_CHANNEL_SYSTEM: "%emoji% Nouveau Channel system",
    OLD_CHANNEL_AFK: "%emoji% Ancien Channel AFK",
    NEW_CHANNEL_AFK: "%emoji% Nouveau Channel AFK",
    OLD_CHANNEL_PUBLIC: "%emoji% Ancien Channel Public",
    NEW_CHANNEL_PUBLIC: "%emoji% Nouveau Channel Public",
    OLD_CHANNEL_RULES: "%emoji% Ancien Channel Règles",
    NEW_CHANNEL_RULES: "%emoji% Nouveau Channel Règles",
    OLD_OWNER: "%emoji% Ancien Propriétaire",
    NEW_OWNER: "%emoji% Nouveau Propriétaire",

};


const translateGuildFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = guildDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateGuildFR;
