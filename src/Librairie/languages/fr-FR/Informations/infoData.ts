const infoDataFR = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    ONLINE: "En ligne",
    DND: "Ne pas déranger",
    AFK: "Absent",
    OFFLINE: "Hors Ligne",
    DISCORD_EMPLOYEE: "Staff Discord",
    DISCORD_PARTNER: `Partenaire Discord`,
    BUGHUNTER_LEVEL_1: `Chasseur de bugs (Level 1)`,
    BUGHUNTER_LEVEL_2: `Chasseur de bugs (Level 2)`,
    HYPESQUAD_EVENTS: `Événements HypeSquad`,
    HOUSE_BRAVERY: `Maison de la bravoure`,
    HOUSE_BRILLIANCE: `Maison de la brillance`,
    HOUSE_BALANCE: `Maison de l\'équilibre`,
    EARLY_SUPPORTER: `Soutien de la première heure`,
    TEAM_USER: 'Utilisateur d\'équipe',
    SYSTEM: 'Système',
    VERIFIED_BOT: `Bot certifié`,
    VERIFIED_DEVELOPER: `Développeur de bot certifié`,
    PLAY: "**Joue:**",
    LISTEN: "**Écoute:**",
    WATCH: "**Regarde:**",
    STREAM: "**Stream:**",
    AUTHOR: "Informations de",
    JOINED: "Rejoint le",
    ACCOUNT: "**Compte créé:**",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**."
};


const translateInfoFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = infoDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateInfoFR;
