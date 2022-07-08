const antibotDataFR = {
    DESCRIPTION: `Si vous voulez rendre l'anti bot **%state%** retapez la commande`,
};


const translateAntibotFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = antibotDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAntibotFR;
