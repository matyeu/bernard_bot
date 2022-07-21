import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Wedding = model("Wedding", new Schema({
    guildID: String,
    userID_1: String,
    userID_2: String,
    date: String,
    money: Number,
    ruby: Number,
    gold: Number,
    spinelle: Number
}));

export const def = {
    guildID: "",
    userID_1: "",
    userID_2: "",
    date: new Date().toLocaleString('en-US', {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }),
    money: 0,
    ruby: 0,
    gold: 0,
    spinelle: 0
};

export async function create(guildID: Snowflake, userID_1: Snowflake, userID_2: Snowflake) {
    let wedding = new Wedding(createMissingProperties(def, {guildID, userID_1, userID_2}));
    await wedding.save();
    Logger.client("Creating a wedding in the database");
    return wedding;
}

export async function find(guildID: Snowflake, userID_1: Snowflake, userID_2: Snowflake) {
    let wedding = await Wedding.findOne({guildID, userID_1, userID_2});
    if(!wedding) return;
    return wedding;
};

export async function edit(guildID: Snowflake, userID_1: Snowflake, userID_2: Snowflake, data: object) {
    await find(guildID, userID_1, userID_2);
    let wedding = await Wedding.findOneAndUpdate({guildID, userID_1, userID_2}, data, {new:true});
    Logger.client("Updating a wedding in the database");
    return await wedding!.save();
};


export default Wedding;