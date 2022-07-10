const purgeDataEN = {
    NUMBER_BETWEEN: "You must specify a number between **1** and **100**.",
    MESSAGE_DELETE_SIZE: "**%messageDelete% messages** have been deleted.",
    BULK_DELETE: "*You cannot** delete messages older than **14 days**.",
    ERROR_DELETE: "An error occurred while deleting messages.",
    NO_MESSAGE_DELETE: "No message to delete.",
    MESSAGE_DELETE_USER: "Messages from **%user%** have been deleted.",
    DEFAULT: "The subcommand %subcommand% is **not valid**."
};


const translatePurgeEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = purgeDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatePurgeEN;
