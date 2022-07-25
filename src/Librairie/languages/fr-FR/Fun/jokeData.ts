const jokeDataFR = {
    TITLE: "%emoji% %user% voici une blague pour vous.",
    DESCRIPTION: "**__Blague:__** %question%\n**__Réponse:__** ||%answer%||",
};


const translateJokeFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = jokeDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateJokeFR;
