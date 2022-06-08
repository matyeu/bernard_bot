import {
    Client,
    ClientOptions,
    Collection,
    CommandInteraction,
    Guild,
    MessageOptions,
    Snowflake,
    TextChannel
} from 'discord.js';
import * as fs from "fs";
import {EMOJIS} from "../config";

export class BernardClient extends Client {
    public config: Object;
    public slashCommands: Collection<any, any>;
    public messageCommands: Collection<any, any>;
    public cooldowns: Collection<any, any>;
    public musicPlayer: Collection<any, any>;
    public buttons: Collection<any, any>;
    public selects: Collection<any, any>;
    public modals: Collection<any, any>;

    constructor(options: ClientOptions) {
        super(options);
        this.config = {};
        this.slashCommands = new Collection();
        this.messageCommands = new Collection();
        this.cooldowns = new Collection();
        this.musicPlayer = new Collection();
        this.buttons = new Collection();
        this.selects = new Collection();
        this.modals = new Collection();

    }

    getEmoji(id: Snowflake) {
        return this.emojis.cache.get(id);
    }

    getRole(guild: Guild, id: Snowflake) {
        return guild.roles.cache.get(id);
    }

    async getChannel(guild: Guild, snowflake: Snowflake, messageData: MessageOptions) {
        if(snowflake) {
            let channel = <TextChannel>guild.channels.cache.get(snowflake);
            if(channel) {
                await channel.send(messageData);
            }
        }
    }

    async getClientChannel(client: BernardClient, snowflake: Snowflake, messageData: MessageOptions) {
        if(snowflake) {
            let channel = <TextChannel>client.channels.cache.get(snowflake);
            if(channel) {
                await channel.send(messageData);
            }
        }
    }
}

declare module "discord.js" {
    interface CommandInteraction {
        replySuccessMessage(client: BernardClient, content: string, ephemeral: boolean): Promise<void>;
        replyErrorMessage(client: BernardClient, content: string, ephemeral: boolean): Promise<void>;
        editSuccessMessage(client: BernardClient, content: string, ephemeral: boolean): any;
        editErrorMessage(client: BernardClient, content: string, ephemeral: boolean): any;
    }
}

CommandInteraction.prototype.replySuccessMessage = function (client: BernardClient, content: string, ephemeral: boolean) {
    return this.reply({content: `${client.getEmoji(EMOJIS.check)} | ${content}`, ephemeral: ephemeral});
};
CommandInteraction.prototype.replyErrorMessage = function (client: BernardClient, content: string, ephemeral: boolean) {
    return this.reply({content: `${client.getEmoji(EMOJIS.error)} | ${content}`, ephemeral: ephemeral});
};
CommandInteraction.prototype.editSuccessMessage = function (client: BernardClient, content: string, ephemeral: boolean) {
    return this.reply({content: `${client.getEmoji(EMOJIS.check)} | ${content}`, ephemeral: ephemeral});
};
CommandInteraction.prototype.editErrorMessage = function (client: BernardClient, content: string, ephemeral: boolean) {
    return this.reply({content: `${client.getEmoji(EMOJIS.error)} | ${content}`, ephemeral: ephemeral});
};

export function getFilesRecursive(directory: string, aFiles?: string[]) {
    const files = fs.readdirSync(directory);
    aFiles = aFiles ?? [];
    files.forEach((file) => {
        const path = `${directory}/${file}`;
        if (fs.statSync(path).isDirectory()) {
            aFiles = getFilesRecursive(path, aFiles);
        } else {
            aFiles!.push(path);
        }
    })
    return aFiles;
}

export function date() {
    return new Date().toLocaleString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

export function createMissingProperties(def: object, obj: object) {
    for (let key of Object.keys(def) as Array<keyof object>) {
        if (typeof def[key] === "object" && !(<any>def[key] instanceof Date)) {
            if (obj[key] === undefined || obj[key] === null) {
                (obj[key] as object) = {};
            }
            createMissingProperties(def[key], obj[key]);
        } else if (obj[key] === undefined || obj[key] === null) {
            obj[key] = def[key];
        }
    }
    return obj;
}

export function capitalize(firstLetter: string) {
    return firstLetter.charAt(0).toUpperCase() + firstLetter.slice(1)
};

export function diffArr(A: any, B: any) {
    return A.filter(function (a: any) {
        return B.indexOf(a) == -1
    })
};