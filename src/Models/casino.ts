import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Casino = model("Casino", new Schema({
    guildID: String,
    userID: String,
    money: Number,
}));

export const def = {
    guildID: "",
    userID: "",
    money: 0,
};

export async function create(guildID: Snowflake, userID: Snowflake) {
    let member = new Casino(createMissingProperties(def, {guildID, userID}));
    await member.save();
    Logger.client("Creating a user in casino in the database");
    return member;
};

export async function find(guildID: Snowflake, userID: Snowflake) {
    let member = await Casino.findOne({guildID, userID});
    if(!member) {
        member = await create(guildID, userID);
    }
    return member;
};

export async function edit(guildID: Snowflake, userID: Snowflake, data: object) {
    await find(guildID, userID);
    let member = await Casino.findOneAndUpdate({guildID, userID}, data, {new:true});
    Logger.client("Updating a user in the casino in the database");
    return await member!.save();
};

export async function update(guildID: Snowflake, userID: Snowflake) {
    let member = await find(guildID, userID);
    let data = createMissingProperties(def, member)
    return edit(guildID, userID, data);
};

export default Casino;