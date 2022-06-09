import {BernardClient} from "../../Librairie";
import {Guild, GuildMember, MessageEmbed, MessageAttachment} from "discord.js";
import {find as findGuild} from "../../Models/guild";
import {create as createMember} from "../../Models/members";
import {EMBED_INFO, EMBED_SUCCESS} from "../../config";
import Canvas from "canvas";
import {resolve} from "path";
import stringCleaner from "@sindresorhus/slugify";

Canvas.registerFont(resolve("./Assets/Fonts/theboldfont.ttf"), {family: "Bold"});
Canvas.registerFont(resolve("./Assets/Fonts/SketchMatch.ttf"), {family: "SketchMatch"});

const Logger = require("../../Librairie/logger");

export default async function (client: BernardClient, newMember: GuildMember) {

    let guildConfig: any = await findGuild(newMember.guild!.id);

    if (newMember.user.bot && guildConfig.modules.antibot) {
        await newMember.kick(`${newMember.user.tag} is a bot`)
            .then(() => Logger.warn(`${newMember.user.tag} was kicked because the antibot is activated!`));

        const embed = new MessageEmbed()
            .setColor(EMBED_INFO)
            .setAuthor({
                name: `${newMember.user.tag}`,
                iconURL: `${newMember.user.displayAvatarURL({dynamic: true, format: "png"})}`
            })
            .setDescription(`**${newMember.user}** was kicked because it is a bot and the anti-bot is **enabled**`)
        return client.getChannel(<Guild>newMember!.guild, guildConfig.channels.log.sanction,
            {content: `<@&${guildConfig.roles.staffs}>`, embeds: [embed]});
    }

    if (newMember.user.bot) return;
    await createMember(newMember.guild!.id, newMember.id);

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
    const background = await Canvas.loadImage('./Assets/Images/welcome.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.fillStyle = "#ffffff";

    const username = stringCleaner(newMember.user.username, {
        separator: " ",
        lowercase: false,
        decamelize: false,
        preserveLeadingUnderscore: true,
    });

    context.font = applyText(canvas, username, 48);
    context.fillText(username, canvas.width - 660, canvas.height - 248);

    context.font = applyText(canvas, `Welcome to ${newMember.guild.name}`, 53);
    context.fillText(`Welcome to ${newMember.guild.name}`, canvas.width - 690, canvas.height - 65);

    context.font = "22px Bold";
    context.fillText(`- ${newMember.guild.memberCount} members!`, 40, canvas.height - 50)
    context.font = "40px Bold";
    context.fillText(newMember.user.discriminator, canvas.width - 623, canvas.height - 178);

    context.fillStyle = "#44d14a";
    context.font = "75px SketchMatch";
    context.fillText("#", canvas.width - 690, canvas.height - 165);

    context.font = "90px Bold";
    context.strokeStyle = "#1d2124";
    context.lineWidth = 15;
    context.strokeText("WELCOME", canvas.width - 620, canvas.height - 330);
    let gradient = context.createLinearGradient(canvas.width - 780, 0, canvas.width - 30, 0);
    gradient.addColorStop(0, "#e15500");
    gradient.addColorStop(1, "#e7b121");
    context.fillStyle = gradient;
    context.fillText("WELCOME", canvas.width - 620, canvas.height - 330);

    context.beginPath();
    context.lineWidth = 10;
    context.strokeStyle = "#03A9F4";
    context.arc(180, 225, 135, 0, Math.PI * 2, true);
    context.stroke();
    context.closePath();
    context.clip();

    const options: any = {format: "png", size: 512},
        avatar = await Canvas.loadImage(newMember.user.displayAvatarURL(options));
    context.drawImage(avatar, 45, 90, 270, 270);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome.png');
    await client.getChannel(<Guild>newMember!.guild, guildConfig.channels.arrival, {files: [attachment]});

    const embedLog = new MessageEmbed()
        .setColor(EMBED_SUCCESS)
        .setAuthor({
            name: `${newMember.user.tag} (${newMember.id})`,
            iconURL: newMember.user.displayAvatarURL({dynamic: true, format: 'png'})
        })
        .setDescription(`
            • Username: ${newMember} - \`${newMember.user.tag}\` (${newMember.id})
            • Created: <t:${parseInt(String(newMember.user.createdTimestamp / 1000))}:f> (<t:${parseInt(String(newMember.user.createdTimestamp / 1000))}:R> )
            • Joined: <t:${parseInt(String(newMember.joinedTimestamp! / 1000))}:f> (<t:${parseInt(String(newMember.joinedTimestamp! / 1000))}:R>)`)
        .setTimestamp()
        .setFooter({text: 'User joined'})
    await client.getChannel(<Guild>newMember!.guild, guildConfig.channels.logs.members, {embeds: [embedLog]});


    return Logger.client(`${newMember.user.tag} has just joined ${newMember.guild.name}`);

};