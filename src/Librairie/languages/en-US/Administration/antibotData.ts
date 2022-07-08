const antibotDataEN = {
    DESCRIPTION: `If you want to make the anti bot **%state%** retype the command`,
};


const translateAntibotEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = antibotDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAntibotEN;
