const channelDataEN = {
    TITLE_CREATION: "Channel creation",
    TITLE_DELETE: "Channel delete",
    TITLE_UPDATE: "Channel update",
    NAME_ADDFIELD: "%emoji% Name (ID)",
    NAME_OLD_NAME: "%emoji% Old Name",
    NAME_NEW_NAME: "%emoji% New Name",
    NAME_OLD_CATEGORY: "Old Category",
    NAME_NEW_CATEGORY: "New Category",
    NAME_OLD_TOPIC: "Old Topic",
    NAME_NEW_TOPIC: "New Topic",
    ACTIVATED: "`Activated`",
    DEACTIVATED: "`Deactivated`",
    MEMBER: "👤 Member (ID)",
    LOG_ROLE: "Automatic voice role",
    ADDED: "added",
    REMOVED: "removed",
    CONNECTION: "Connection",
    DISCONNECT: "Disconnect",
    CAMERA_ON: "Camera On",
    CAMERA_OFF: "Camera Off",
    STREAMING_START: "Start Streaming",
    STREAMING_OFF: "Stop Streaming",
    DEAF_ON: "Deaf On",
    DEAF_SERVER_ON: "Deaf (Server) On",
    DEAF_OFF: "Deaf Off",
    DEAF_SERVER_OFF: "Deaf (Server) Off",
    DEAF: "🤖 Deaf",
    MUTE_ON: "Mute On",
    MUTE_SERVER_ON: "Mute (Server) On",
    MUTE_OFF: "Mute Off",
    MUTE_SERVER_OFF: "Mute (Server) Off"
};


const translateChannelEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = channelDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateChannelEN;
