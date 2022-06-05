import {Client, ClientOptions, Collection, Guild, MessageOptions, Snowflake, TextChannel} from 'discord.js';
import * as fs from "fs";


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

    async guildLog(guild: Guild, snowflake: Snowflake, messageData: MessageOptions) {
        if(snowflake) {
            let channel = <TextChannel>guild.channels.cache.get(snowflake);
            if(channel) {
                await channel.send(messageData);
            }
        }
    }
}


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

export function getMissingProperties(def: object, obj: object, prevKey?: string) {
    prevKey = prevKey ?? "obj";
    let arr: string[] = [];
    for (let key of Object.keys(def) as Array<keyof object>) {
        if (typeof def[key] === "object") {
            if (!obj[key]) {
                arr.push(`${prevKey}.${key}`);
                arr = [...arr, ...getMissingProperties(def[key], {}, key)];
            } else arr = [...arr, ...getMissingProperties(def[key], obj[key], `${prevKey}.${key}`)];
        }

        if (!obj[key]) {
            arr.push(`${prevKey}.${key}`);
        }
    }
    return arr
};