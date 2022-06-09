import {model, Schema} from 'mongoose';
import {Snowflake} from 'discord.js';
import {createMissingProperties} from "../Librairie";
const Logger = require("../Librairie/logger");

let Bans = model("Bans", new Schema({
    guildID: String,
    memberBan: String,
    memberStaff: String,
    reason: String,
    time: String,
    reference: String,
    case: Number,
    date: Date,
}));


export const def = {
    guildID: "",
    memberBan: "",
    memberStaff: "",
    reason: "",
    time: "",
    reference: "",
    case: 0,
    date: 0,
};

export async function create(id: Snowflake, memberBan: Snowflake, memberStaff: Snowflake, reason: string, time: string, date: Number) {
    let ban = new Bans(createMissingProperties(def,
        {guildID: id, memberBan: memberBan, memberStaff: memberStaff, reason: reason, time: time, date: date}));
    await ban.save();
    Logger.client("Creating a ban in the database");
    return ban;
};

export async function find(id: Snowflake, memberBan: Snowflake) {
    let ban = await Bans.findOne({guildID: id, memberBan: memberBan});
    return ban;
};

export async function findAll(id: Snowflake) {
    let ban = await Bans.find({memberBan: id});
    return ban;
}

export async function edit(id: Snowflake, memberBan: Snowflake, data: object) {
    await find(id, memberBan);
    let guild = await Bans.findOneAndUpdate({guildID: id, memberBan: memberBan}, data, {new: true});
    Logger.client("Updating a ban in the database");
    return await guild!.save();
};


export default Bans;