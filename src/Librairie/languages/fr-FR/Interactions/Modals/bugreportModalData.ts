const bugReportModalFR = {
    CHANNEL_BUG_NOTFOUND: "Le chalon `bug` est **pas configuré** ou **introuvable**",
    ERROR_BUG: "Votre report doit comporter au moins **\`20\` caractères**",
    DESCRIPTION: "%description%\n\n*Appuyez sur la réaction %emoji% pour créer un fil de discussion!*",
    CONTENT: "Votre report **a été envoyé**!",
};


const translateBugReportModalFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = bugReportModalFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBugReportModalFR;
