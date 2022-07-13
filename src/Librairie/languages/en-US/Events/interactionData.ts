const interactionDataEN = {
    CONTENT_MAINTENANCE_COMMAND: "This command is **under maintenance**...",
    CONTENT_PERMISSION: "**You don't have** the permission to use this command !",
    CONTENT_RPG: "**No RPG profile detected: \`/start\`**",
    CONTENT_COOLDOWNS: "Please wait **%time%** to run this command again.",
};


const translateInteractionEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = interactionDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateInteractionEN;
