const pingDataFR = {
    TITLE: "🏓 | Temps de réponses",
    BOT_LATENCY: "Latence du bot",
    API_LATENCY: "Latence de l'api",
};


const translatePingFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = pingDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatePingFR;
