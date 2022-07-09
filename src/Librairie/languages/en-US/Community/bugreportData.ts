const bugReportDataEN = {
    TITLE_MODAL: "Report a bug",
    TITLE_BUG: "What is the title of the bug?",
    DESCRIPTION_BUG: "What is the description of the bug?"
};


const translateBugReportEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = bugReportDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBugReportEN;
