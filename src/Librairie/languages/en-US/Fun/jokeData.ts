const jokeDataEN = {
    TITLE: "%emoji% %user% here is a joke for you.",
    DESCRIPTION: "**__Joke:__** %question%\n**__Answer:__** ||%answer%||",
};


const translateJokeEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = jokeDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateJokeEN;
