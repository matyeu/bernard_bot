const channelDataFR = {
    TITLE_CREATION: "Création Salon",
    TITLE_DELETE: "Suppression Salon",
    TITLE_UPDATE: "Mise à jour Salon",
    NAME_ADDFIELD: "%emoji% Nom (ID)",
    NAME_OLD_NAME: "%emoji% Ancien Nom",
    NAME_NEW_NAME: "%emoji% Nouveau Nome",
    NAME_OLD_CATEGORY: "Ancienne Catégorie",
    NAME_NEW_CATEGORY: "Nouvelle Catégorie",
    NAME_OLD_TOPIC: "Ancien Topic",
    NAME_NEW_TOPIC: "Nouveau Topic",
    ACTIVATED: "`Activé`",
    DEACTIVATED: "`Désactivé`",
    MEMBER: "👤 Membre (ID)",
    LOG_ROLE: "Rôle vocale automatique",
    ADDED: "ajouté",
    REMOVED: "retiré",
    CONNECTION: "Connexion",
    DISCONNECT: "Déconnexion",
    CAMERA_ON: "Caméra Activé",
    CAMERA_OFF: "Caméra Désactivé",
    STREAMING_START: "Lancement Streaming",
    STREAMING_OFF: "Arrêt Streaming",
    DEAF_ON: "Sourdine Activée",
    DEAF_SERVER_ON: "Sourdine (Serveur) Activé",
    DEAF_OFF: "Sourdine Désactivée",
    DEAF_SERVER_OFF: "Sourdine (Serveur) Désactivé",
    DEAF: "🤖 Sourdine",
    MUTE_ON: "Muet Activé",
    MUTE_SERVER_ON: "Muet (Serveur) Activé",
    MUTE_OFF: "Muet Désactivé",
    MUTE_SERVER_OFF: "Muet (Serveur) Désactivé"
};


const translateChannelFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = channelDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateChannelFR;
