const peaceDataEN = {
    PEACE_LAUNCHED: "The peace order will be launched.",
    PICTURE: "https://i.pinimg.com/originals/98/c7/fa/98c7fa7afe6df8db59aa5ba9e69068a4.gif",
    EMBED_1: "**Tempers flare, it happens, but let's try to stay calm...**",
    EMBED_2: "**This exchange is unpleasant for everyone, so we breathe and relax...**",
    EMBED_3: "**It's time to continue the discussion in private...**",
    EMBED_4: "**Because you create a bad atmosphere that disturbs everyone... **",
    EMBED_5: "**Please respect the peace that usually prevails on this channel... Merci :pray: **",
    EMBED_6: "**You can speak again, in calmness and joy-attitude !** %emoji%",
};


const translatePeaceEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = peaceDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatePeaceEN;
