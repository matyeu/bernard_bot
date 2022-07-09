const bugReportDataFR = {
    TITLE_MODAL: "Signaler un bug",
    TITLE_BUG: "Quel est le titre du bug ?",
    DESCRIPTION_BUG: "Quel est la description du bug ?"
};


const translateBugReportFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = bugReportDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBugReportFR;
