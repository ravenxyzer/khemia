import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ButtonStyle, Message } from "discord.js";

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
export default class AttendanceCommand extends Command {
    public override async messageRun(message: Message): Promise<void> {
        const { funcs } = this.container.utilities;

        await message.channel.send({
            embeds: [funcs.embed().setTitle("✍️ ・ Staff Attendance").setDescription("> Tekan tombol dibawah untuk absen kehadiran!")],
            components: [
                new ActionRowBuilder<ButtonBuilder>().setComponents(
                    new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Attend!").setCustomId("_attendance-button")
                ),
            ],
        });
    }
}
