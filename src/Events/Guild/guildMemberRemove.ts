import {BernardClient} from "../../Librairie";
import {Guild, GuildMember, MessageAttachment, MessageEmbed} from "discord.js";
import {find as findMember} from "../../Models/members";
import {find as findGuild} from "../../Models/guild";
import Canvas from "canvas";
import {resolve} from "path";
import stringCleaner from "@sindresorhus/slugify";
import {EMBED_ERROR} from "../../config";

Canvas.registerFont(resolve("./assets/Fonts/theboldfont.ttf"), {family: "Bold"});
Canvas.registerFont(resolve("./assets/Fonts/SketchMatch.ttf"), {family: "SketchMatch"});

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient, oldMember: GuildMember) {

    if (oldMember.user.bot) return;

    let guildConfig: any = await findGuild(oldMember.guild!.id);
    let language = require(`../../Librairie/languages/${guildConfig.language}/Events/Channel/guildData`);
    let memberConfig: any = await findMember(oldMember.guild!.id, oldMember.id);
    if (memberConfig) await memberConfig.delete();

    const applyText = (canvas: { getContext: (arg0: string) => any; }, text: any, defaultFontSize: number) => {
        const ctx = canvas.getContext("2d");
        do {
            ctx.font = `${defaultFontSize -= 10}px Bold`;
        }
        while (ctx.measureText(text).width > 600);
        return ctx.font;
    };
    const canvas: any = Canvas.createCanvas(1024, 450);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('./assets/Images/welcome.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.fillStyle = "#ffffff";

    const username = stringCleaner(oldMember.user.username, {
        separator: " ",
        lowercase: false,
        decamelize: false,
        preserveLeadingUnderscore: true,
    });

    context.font = applyText(canvas, username, 48);
    context.fillText(username, canvas.width - 660, canvas.height - 248);

    context.font = applyText(canvas, language("GOODBYE_MESSAGE"), 53);
    context.fillText(language("GOODBYE_MESSAGE"), canvas.width - 690, canvas.height - 65);

    context.font = "22px Bold";
    context.fillText(`- ${oldMember.guild.memberCount} members!`, 40, canvas.height - 50)
    context.font = "40px Bold";
    context.fillText(oldMember.user.discriminator, canvas.width - 623, canvas.height - 178);

    context.fillStyle = "#44d14a";
    context.font = "75px SketchMatch";
    context.fillText("#", canvas.width - 690, canvas.height - 165);

    context.font = "90px Bold";
    context.strokeStyle = "#1d2124";
    context.lineWidth = 15;
    context.strokeText(language("GOODBYE"), canvas.width - 620, canvas.height - 330);
    let gradient = context.createLinearGradient(canvas.width - 780, 0, canvas.width - 30, 0);
    gradient.addColorStop(0, "#e15500");
    gradient.addColorStop(1, "#e7b121");
    context.fillStyle = gradient;
    context.fillText(language("GOODBYE"), canvas.width - 620, canvas.height - 330);

    context.beginPath();
    context.lineWidth = 10;
    context.strokeStyle = "#03A9F4";
    context.arc(180, 225, 135, 0, Math.PI * 2, true);
    context.stroke();
    context.closePath();
    context.clip();

    const options: any = {format: "png", size: 512},
        avatar = await Canvas.loadImage(oldMember.user.displayAvatarURL(options));
    context.drawImage(avatar, 45, 90, 270, 270);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'goodbye.png');
    await client.getChannel(<Guild>oldMember!.guild, guildConfig.channels.arrival, {files: [attachment]});

    let user = `${oldMember} - \`${oldMember.user.tag}\` (${oldMember.id})`;
    let created = `<t:${parseInt(String(oldMember.user.createdTimestamp / 1000))}:f> (<t:${parseInt(String(oldMember.user.createdTimestamp / 1000))}:R>)`;
    let left = `<t:${parseInt(String(Date.now() / 1000))}:f> (<t:${parseInt(String(Date.now() / 1000))}:R>)`

    const embedLog = new MessageEmbed()
        .setColor(EMBED_ERROR)
        .setAuthor({
            name: `${oldMember.user.tag} (${oldMember.id})`,
            iconURL: oldMember.user.displayAvatarURL({dynamic: true, format: 'png'})
        })
        .setDescription(language("GOODBYE_DESCRIPTION").replace('%user%', user).replace('%created%', created).replace('%left%', left))
        .setTimestamp()
        .setFooter({text: 'User left'})
    await client.getChannel(<Guild>oldMember!.guild, guildConfig.channels.logs.members, {embeds: [embedLog]});


    return Logger.client(`${oldMember.user.tag} has just left ${oldMember.guild.name}`);


};