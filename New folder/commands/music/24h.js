const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { joinVoiceChannel } = require('@discordjs/voice');
const { Utils } = require("devtools-ts");
const utilites = new Utils();
const db = require(`quick.db`)


module.exports = {
    name: "24h",
    description: "Toggles the 24h mode. This makes the bot doesn't leave the voice channel until you stop it.",
    cooldown: 5000,
    aliases: ['24h', '24h'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });

            let channel = message.member.voice.channel;
            if (!channel) return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" });

            distube.voices.join(channel).then(() => {
                if (!db.get(`24h${message.guild.id}`)) {
                    db.set(`24h${message.guild.id}`, channel.id)
                    message.reply({ content: `:white_check_mark: Successful enabled the 24h!` });
                } else {
                    db.delete(`24h${message.guild.id}`)
                    message.reply({ content: `:white_check_mark: Successful disabled the 24h!` })
                }
            })
        } catch (err) {
            console.log(err)
        }
    },
};