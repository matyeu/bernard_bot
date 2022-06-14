import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Morpion = model("Morpion", new Schema({
    guildID: String,
    userID_1: String,
    userID_2: String,
    firstPlayer: String,
    currentPlayer: String,
    boxChecked: Number,
    grid: Array,
}));

export const def = {
    guildID: "",
    userID_1: "",
    userID_2: "",
    firstPlayer: "",
    currentPlayer: "",
    boxChecked: 0,
    grid: Array
};

export async function create(guildID: Snowflake, userID_1: Snowflake) {
    let game = new Morpion(createMissingProperties(def, {guildID, userID_1}));
    await game.save();
    Logger.client("Creating a morpion in the database");
    return game;
}

export async function find(guildID: Snowflake, userID_1: Snowflake) {
    let game = await Morpion.findOne({guildID, userID_1});
    if(!game) return;
    return game;
};

export async function edit(guildID: Snowflake, userID_1: Snowflake, data: object) {
    await find(guildID, userID_1);
    let game = await Morpion.findOneAndUpdate({guildID, userID_1}, data, {new:true});
    Logger.client("Updating a morpion in the database");
    return await game!.save();
};

export default Morpion;
