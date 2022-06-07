import {model, Schema} from 'mongoose';
import {Guild, Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";
import {SERVER} from "../config";

const Logger = require("../Librairie/logger");

let Client = model("Client", new Schema({
    support: String,
    server: String,
    suggestion: String,
    bug: String,
}));

export const def = {
    support: SERVER.id,
    server: SERVER.server,
    suggestion: SERVER.suggestion,
    bug: SERVER.bug,

};

export async function create(id: Snowflake) {
    let client = new Client(createMissingProperties(def, {support: id}));
    await client.save();
    Logger.client("Creating a client in the database");
    return client;
};

export async function find(id: Snowflake) {
    let client = await Client.findOne({support: id});
    if(!client) client = await create(id);
    return client;
};

export default Client;