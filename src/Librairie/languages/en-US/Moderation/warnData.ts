const warnDataEN = {
    MEMBER_ERROR: "This user does **not exist** or **cannot be found**.",
    WARN_ERROR: "**You can't** warn this user.",
    DESCRIPTION_WARN: "%user% wants to warn **%member%** for the following reason: **%reason%**",
    DESCRIPTION_UNWARN: "%user% wants to unwarn **%member%** for the following reason: **%reason%**",
    MEMBER: "👤 Member (ID)",
    OLD_STAFF: "An old staff",
    NOT_WARNING: "This warning does **not exist** in the database.",
    REASON_REQUIRED: "A reason is **required** to delete a warn.",
    WARN_USER_HAS: "%user% has **%number%** warns.",
    NAME_VALUE_USER: "Warn n°%number% by \`%staff%\` the %date%:",
    WARN_SERVER_HAS: "%server% has **%number%** warns.",
    OLD_MEMBER: "An old member",
    NAME_VALUE_SERVER: "Warn %user% by \`%staff%\` the %date%:",
    DEFAULT: "The subcommand %subcommand% is **not valid**."
};


const translateWarnEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = warnDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWarnEN;
