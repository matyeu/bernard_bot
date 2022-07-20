const exchangeDataEN = {
    MEMBER_ERROR: "This user does **not exist** or **cannot be found**.",
    ACCOUNT_UNDEFINED: "**%user% has not** yet created a **role-play account**.",
    QUANTITY_ERROR_NOTHAVE: "Oops, **you are missing** \`%quantity%\` %emoji% **to validate** this exchange!",
    USER_ERROR_NOTHAVE: "",
    SUCCESS_CONTENT: "%emoji% | The secure exchange request **has been sent successfully**.",
    ACCEPT: "Yes",
    REFUSED: "No",
    EXCHANGE_CONTENT: "%emoji% | %userToExchange%, %user% **asks you `%quantity%` %emoji% for the sum of `%money%` %moneyEmoji%, do you accept?**\nResponse time: **20 seconds**"
};


const translateExchangeEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = exchangeDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateExchangeEN;
