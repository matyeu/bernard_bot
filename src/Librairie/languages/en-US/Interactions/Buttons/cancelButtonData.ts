const cancelDataEN = {
    ERROR_AUTHOR: "You must be **the author** of this command to use this button",
    CONTENT: "%emoji% | Command **cancel.**",
};


const translateCancelEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = cancelDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCancelEN;
