import { ApplyOptions } from "@sapphire/decorators";
import { InteractionHandlerTypes } from "@sapphire/framework";
import { PrismaClient } from "@prisma/client";
import { ButtonInteraction, EmbedBuilder, TextChannel } from "discord.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isYesterday from "dayjs/plugin/isYesterday";

import { Emojis, InteractionHandler } from "../libraries";

@ApplyOptions<InteractionHandler.Options>({
    name: "attendance",
    interactionHandlerType: InteractionHandlerTypes.Button,
})
export class AttendanceHandler extends InteractionHandler {
    public parse(interaction: ButtonInteraction) {
        if (interaction.customId === "_attendance-button") return this.some();

        this.none();
    }

    public override async run(interaction: ButtonInteraction): Promise<void> {
        const { utils } = this.container.utilities;
        const channel: TextChannel = interaction.guild.channels.cache.get("1087844895726784612") as TextChannel;
        const embed: EmbedBuilder = utils
            .embed()
            .setAuthor({
                name: "Staff Attendance!",
                iconURL: this.container.client.user.displayAvatarURL({ size: 4096 }),
            })
            .setThumbnail(interaction.user.displayAvatarURL({ size: 4096 }))
            .setDescription(`${Emojis.checkmark} ・ ${interaction.user.tag} telah mengisi absen.`);

        const prisma = new PrismaClient();
        const user = await prisma.user.findFirst({
            where: {
                userId: interaction.user.id,
            },
        });

        dayjs.extend(utc);
        dayjs.extend(isYesterday);

        const now = dayjs().utcOffset(7);

        if (!user) {
            const newUser = await prisma.user.create({
                data: {
                    userId: interaction.user.id,
                    lastAttend: new Date(),
                    attendStreak: 1,
                    attendSum: 1,
                },
            });

            await interaction.reply({ content: "Absen berhasil!", ephemeral: true });
            await channel.send({
                embeds: [
                    embed
                        .addFields([
                            {
                                name: "Time",
                                value: `${now.format("HH:mm")} WIB`,
                            },
                            { name: "Total", value: `${newUser.attendSum}x` },
                            { name: "Streak", value: `${newUser.attendStreak}x` },
                        ])
                        .setFooter({
                            text: `Terima kasih sudah absen dan tingkatkan terus kehadiranmu!`,
                        }),
                ],
            });
        } else {
            const lastAttend = dayjs(user.lastAttend).utcOffset(7);
            const lastAttendDatetoDaySum = lastAttend.year() * 365 + (lastAttend.month() + 1) * 30 + lastAttend.day();
            const currentDateToDaySum = now.year() * 365 + (now.month() + 1) * 30 + now.day();

            if (lastAttend.isYesterday()) {
                if (currentDateToDaySum - lastAttendDatetoDaySum >= 2) {
                    /* STREAK FAILED */

                    const updatedUser = await prisma.user.update({
                        where: {
                            userId: interaction.user.id,
                        },
                        data: {
                            lastAttend: new Date(),
                            attendStreak: 1,
                            attendSum: { increment: 1 },
                        },
                    });

                    await interaction.reply({ content: "Absen berhasil!", ephemeral: true });
                    await channel.send({
                        embeds: [
                            embed
                                .addFields([
                                    {
                                        name: "Time",
                                        value: `${now.format("HH:mm")} WIB`,
                                    },
                                    { name: "Total", value: `${updatedUser.attendSum}x` },
                                    { name: "Streak", value: `${updatedUser.attendStreak}x` },
                                ])
                                .setFooter({ text: `Absen beruntun gagal nih :(` }),
                        ],
                    });
                } else {
                    /* STREAK SUCCESS */

                    const updatedUser = await prisma.user.update({
                        where: {
                            userId: interaction.user.id,
                        },
                        data: {
                            lastAttend: new Date(),
                            attendStreak: { increment: 1 },
                            attendSum: { increment: 1 },
                        },
                    });

                    await interaction.reply({ content: "Absen berhasil!", ephemeral: true });
                    await channel.send({
                        embeds: [
                            embed
                                .addFields([
                                    {
                                        name: "Time",
                                        value: `${now.format("HH:mm")} WIB`,
                                    },
                                    { name: "Total", value: `${updatedUser.attendSum}x` },
                                    { name: "Streak", value: `${updatedUser.attendStreak}x` },
                                ])
                                .setFooter({
                                    text: `Wow, absen beruntun yang ke-${updatedUser.attendStreak}. Tingkatkan terus kehadiranmu!`,
                                }),
                        ],
                    });
                }
            } else {
                await interaction.reply({ content: "❌ Anda sudah absen hari ini!", ephemeral: true });
                this.container;
            }
        }
    }
}
