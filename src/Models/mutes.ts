import {model, Schema} from 'mongoose';
import {Snowflake} from 'discord.js';
import {createMissingProperties} from "../Librairie";
const Logger = require("../Librairie/logger");

let Mutes = model("Mutes", new Schema({
    guildID: String,
    memberMute: String,
    memberStaff: String,
    reason: String,
    time: String,
    reference: String,
    case: Number,
    date: Date,
}));


export const def = {
    guildID: "",
    memberMute: "",
    memberStaff: "",
    reason: "",
    time: "",
    reference: "",
    case: 0,
    date: 0,
};

export async function create(id: Snowflake, memberMute: Snowflake, memberStaff: Snowflake, reason: string, time: string, date: Number) {
    let mute = new Mutes(createMissingProperties(def,
        {guildID: id, memberMute: memberMute, memberStaff: memberStaff, reason: reason, time: time, date: date}));
    await mute.save();
    Logger.client("Creating a mute in the database");
    return mute;
};

export async function find(id: Snowflake, memberMute: Snowflake) {
    let mute = await Mutes.findOne({guildID: id, memberMute: memberMute});
    return mute;
};

export async function findAll(id: Snowflake) {
    let mute = await Mutes.find({memberMute: id});
    return mute;
}

export async function edit(id: Snowflake, memberMute: Snowflake, data: object) {
    await find(id, memberMute);
    let mute = await Mutes.findOneAndUpdate({guildID: id, memberMute: memberMute}, data, {new: true});
    Logger.client("Updating a mute in the database");
    return await mute!.save();
};


export default Mutes;