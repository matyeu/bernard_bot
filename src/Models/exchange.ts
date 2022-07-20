import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";
const Logger = require("../Librairie/logger");

let Exchange = model("Exchange", new Schema({
    guildID: String,
    userID_1: String,
    userID_2: String,
    item: String,
    quantity: Number,
    money: Number,
}));

export const def = {
    guildID: "",
    userID_1: "",
    userID_2: "",
    item: "",
    quantity: 0,
    money: 0,
};

export async function create(guildID: Snowflake, userID_1: Snowflake, userID_2: Snowflake, item: string, quantity: number, money: number) {
    let member = new Exchange(createMissingProperties(def, {guildID, userID_1, userID_2, item, quantity, money}));
    await member.save();
    Logger.client("Creating a exchange in the database");
    return member;
}

export async function find(guildID: Snowflake, userID_1: Snowflake) {
    let member = await Exchange.findOne({guildID, userID_1});
    if(!member) return;
    return member;
};

export async function edit(guildID: Snowflake, userID_1: Snowflake, data: object) {
    await find(guildID, userID_1);
    let member = await Exchange.findOneAndUpdate({guildID, userID_1}, data, {new:true});
    Logger.client("Updating a exchange in the database");
    return await member!.save();
};


export default Exchange;