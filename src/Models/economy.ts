import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Economy = model("Economy", new Schema({
    guildID: String,
    userID: String,
    money: Number,
    bank: Number,
}));

export const def = {
    guildID: "",
    userID: "",
    money: 0,
    bank: 0,
};

export async function create(guildID: Snowflake, userID: Snowflake) {
    let member = new Economy(createMissingProperties(def, {guildID, userID}));
    await member.save();
    Logger.client("Creating a user in economy in the database");
    return member;
};

export async function find(guildID: Snowflake, userID: Snowflake) {
    let member = await Economy.findOne({guildID, userID});
    if(!member) {
        member = await create(guildID, userID);
    }
    return member;
};

export async function edit(guildID: Snowflake, userID: Snowflake, data: object) {
    await find(guildID, userID);
    let member = await Economy.findOneAndUpdate({guildID, userID}, data, {new:true});
    Logger.client("Updating a user in the economy in the database");
    return await member!.save();
};

export async function update(guildID: Snowflake, userID: Snowflake) {
    let member = await find(guildID, userID);
    let data = createMissingProperties(def, member)
    return edit(guildID, userID, data);
};

export default Economy;