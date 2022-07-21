import {model, Schema} from "mongoose";
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Roleplay = model("Roleplay", new Schema({
    guildID: String,
    userID: String,
    createAccount: String,
    uui: Number,
    health: {
        hp: {
            now: Number,
            total: Number,
        },
        energy: {
            now: Number,
            total: Number,
        },
        hygiene: {
            now: Number,
            total: Number,
        },
    },
    power: {
        attack: Number,
        defence: Number
    },
    wedding: {
        enabled: Boolean,
        partner: String,
    },
    inventory: {
        equipements: {
            headset: Boolean,
            legwarmers: Boolean,
            boots: Boolean,
            gloves: Boolean,
            ring: Boolean,
            collar: Boolean,
            belt: Boolean,
            weapon: Boolean,
            shield: Boolean,
            arc: Boolean,
            fishingRod: Boolean,
            pickaxe: Boolean,
            axe: Boolean,
        },
        consumables: {
            crescent: Number,
            baguette: Number,
            cookie: Number,
            brioche: Number,
            apple: Number,
            orange: Number,
            salmon: Number,
            cantaril: Number,
            iron: Number,
            crystal: Number,
            ruby: Number,
            gold: Number,
            spinelle: Number,
            eclatsSpinelle: Number,
            powerPotion: Number,
            potionEnergy: Number,
            potionPdv: Number,
            coal: Number,
            wood: Number,
            chene: Number,
            girolle: Number,
            coulemelle: Number,
            meat: Number,
            skin: Number,
            arrow: Number,
            bandage: Number,
        },
    },
    cooldowns: {
        farms: Number,
    }
}))

export const def = {
    guildID: "",
    userID: "",
    createAccount: new Date().toLocaleString('en-US', {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }),
    uui: 0,
    health: {
        hp: {
            now: 10,
            total: 10,
        },
        energy: {
            now: 50,
            total: 50,
        },
        hygiene: {
            now: 40,
            total: 40,
        },
    },
    power: {
        attack: 0,
        defence: 0
    },
    wedding: {
        enabled: false,
        partner: "",
    },
    inventory: {
        equipements: {
            headset: false,
            legwarmers: false,
            boots: false,
            gloves: false,
            ring: false,
            collar: false,
            belt: false,
            weapon: false,
            shield: false,
            arc: false,
            fishingRod: false,
            pickaxe: false,
            axe: false,
        },
        consumables: {
            crescent: 0,
            baguette: 0,
            cookie: 0,
            brioche: 0,
            apple: 0,
            orange: 0,
            salmon: 0,
            cantaril: 0,
            iron: 0,
            crystal: 0,
            ruby: 0,
            gold: 0,
            spinelle: 0,
            eclatsSpinelle: 0,
            powerPotion: 0,
            potionEnergy: 0,
            potionPdv: 0,
            coal: 0,
            wood: 0,
            chene: 0,
            girolle: 0,
            coulemelle: 0,
            meat: 0,
            skin: 0,
            arrow: 0,
            bandage: 0,
        },
    },
    cooldowns: {
        farms: 0
    }
}

export async function create(guildID: Snowflake, userID: Snowflake, uui: number) {
    let member = new Roleplay(createMissingProperties(def, {guildID, userID, uui}));
    await member.save();
    Logger.client("Creating a user roleplay in the database");
    return member;
}

export async function find(guildID: Snowflake, userID: Snowflake) {
    let member = await Roleplay.findOne({guildID, userID});
    if (member) return member;
    return null;
};

export async function findServer(guildID: Snowflake) {
    if (!guildID) return null;
    const members = await Roleplay.find({guildID: guildID});
    if (members) return members;
    return null;
}

export async function edit(guildID: Snowflake, userID: Snowflake, data: object) {
    await find(guildID, userID);
    let member = await Roleplay.findOneAndUpdate({guildID, userID}, data, {new: true});
    Logger.client("Updating a user roleplay in the database");
    return await member!.save();
}

export default Roleplay;