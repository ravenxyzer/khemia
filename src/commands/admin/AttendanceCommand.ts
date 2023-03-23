import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ButtonStyle, Message, APIMessageComponentEmoji } from "discord.js";

import { Command } from "../../libraries";

@ApplyOptions<Command.Options>({
    name: "attendance",
    description: "Staff daily attendance.",
    extendedDescription: {
        usage: "attendance",
    },
    requiredClientPermissions: ["SendMessages"],
    requiredUserPermissions: ["SendMessages"],
    preconditions: ["OwnerOnly"],
})
export class AttendanceCommand extends Command {
    public override async messageRun(message: Message): Promise<void> {
        const utils = this.container.utilities.utils;

        await message.channel.send({
            embeds: [
                utils
                    .embed()
                    .setTitle("✍️ ・ Staff Attendance")
                    .setDescription("> Tekan tombol dibawah untuk absen kehadiran!"),
            ],
            components: [
                new ActionRowBuilder<ButtonBuilder>().setComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel("Attend!")
                        .setCustomId("_attendance-button")
                ),
            ],
        });
    }
}
