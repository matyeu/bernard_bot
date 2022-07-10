const peaceDataFR = {
    PEACE_LAUNCHED: "La commande peace est en cours de lancement.",
    PICTURE: "https://i.pinimg.com/originals/98/c7/fa/98c7fa7afe6df8db59aa5ba9e69068a4.gif",
    EMBED_1: "**Les esprits s'échauffent, ça arrive, mais tâchons de retrouver notre calme...**",
    EMBED_2: "**Cet échange est désagréable pour tout le monde, alors on respire et on se détend...**",
    EMBED_3: "**Si vous souhaitez vraiment continuer à débattre, continuez en privé... **",
    EMBED_4: "**Car vous instaurez une mauvaise ambiance qui dérange tout le monde... **",
    EMBED_5: "**Soyez aimables de respecter la paix qui règne habituellement sur ce channel... Merci :pray: **",
    EMBED_6: "**Vous pouvez à nouveau parler, dans le calme et la joie de vivre !** %emoji%",
};


const translatePeaceFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = peaceDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatePeaceFR;
