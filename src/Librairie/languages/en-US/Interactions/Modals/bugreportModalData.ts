const bugReportModalEN = {
    CHANNEL_BUG_NOTFOUND: "The channel `bug` is **not configured** or **cannot be found**.",
    ERROR_BUG: "Your bugreport must be at least **\`20\` characters long**",
    DESCRIPTION: "%description%\n\n*Press the %emoji% reaction to create a thread for discussion!*",
    CONTENT: "Your bugreport **has been sent**!",
};


const translateBugReportModalEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = bugReportModalEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBugReportModalEN;
