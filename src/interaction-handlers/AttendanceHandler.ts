import { ApplyOptions } from "@sapphire/decorators";
import { InteractionHandlerTypes } from "@sapphire/framework";
import { PrismaClient } from "@prisma/client";
import { ButtonInteraction, EmbedBuilder, TextChannel } from "discord.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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
        const { funcs } = this.container.utilities;
        const client = this.container.client;
        const channel: TextChannel = interaction.guild.channels.cache.get("1087844895726784612") as TextChannel;
        const prisma: PrismaClient = new PrismaClient();

        const embed: EmbedBuilder = funcs.embed();
        embed.setAuthor({ name: "Kehadiran Staff!", iconURL: client.user.displayAvatarURL({ size: 4096 }) });
        embed.setThumbnail(interaction.user.displayAvatarURL({ size: 4096 }));
        embed.setDescription(`${Emojis.checkmark} ・ ${interaction.user.tag} telah mengisi absen.`);
        embed.setFooter({ text: "Terima kasih sudah absen dan tingkatkan terus kehadiranmu!" });

        const now = dayjs(new Date()).utcOffset(7);

        const user = await prisma.user.findFirst({
            where: {
                userId: interaction.user.id,
            },
        });

        if (!user) {
            const newUser = await prisma.user.create({
                data: {
                    userId: interaction.user.id,
                    lastAttend: new Date(),
                    attendStreak: 1,
                    attendSum: 1,
                },
            });

            const daysInMonth = now.daysInMonth();
            const diff = newUser.attendSum - daysInMonth;

            await interaction.reply({ content: `${Emojis.checkmark} ・ Absen berhasil!`, ephemeral: true });

            await channel.send({
                embeds: [
                    embed.addFields([
                        { name: "Waktu", value: `${now.format("HH:mm")} WIB` },
                        { name: "Total Kehadiran", value: `${newUser.attendSum}` },
                        { name: "Kehadiran Beruntun", value: `${newUser.attendStreak}` },
                        { name: "Absen Bulanan", value: `${newUser.attendSum}/${daysInMonth} (-${diff})` },
                    ]),
                ],
            });
        } else {
            const lastAttend = dayjs(user.lastAttend).utcOffset(7);
            const currentDateToDaySum = now.year() * 365 + (now.month() + 1) * 30 + now.day();
            const lastAttendDateToDaySum = lastAttend.year() * 365 + (lastAttend.month() + 1) * 30 + lastAttend.day();

            if (currentDateToDaySum - lastAttendDateToDaySum >= 1) {
                if (currentDateToDaySum - lastAttendDateToDaySum >= 2) {
                    // Streak Failed

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

                    const daysInMonth = now.daysInMonth();
                    const diff = updatedUser.attendSum - daysInMonth;

                    await channel.send({
                        embeds: [
                            embed.addFields([
                                { name: "Waktu", value: `${now.format("HH:mm")} WIB` },
                                { name: "Total Kehadiran", value: `${updatedUser.attendSum}` },
                                { name: "Kehadiran Beruntun", value: `${updatedUser.attendStreak}` },
                                { name: "Absen Bulanan", value: `${updatedUser.attendSum}/${daysInMonth} (-${diff})` },
                            ]),
                        ],
                    });
                } else {
                    // Streak Success
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

                    const daysInMonth = now.daysInMonth();
                    const diff = updatedUser.attendSum - daysInMonth;

                    await channel.send({
                        embeds: [
                            embed.addFields([
                                { name: "Waktu", value: `${now.format("HH:mm")} WIB` },
                                { name: "Total Kehadiran", value: `${updatedUser.attendSum}` },
                                { name: "Kehadiran Beruntun", value: `${updatedUser.attendStreak}` },
                                { name: "Absen Bulanan", value: `${updatedUser.attendSum}/${daysInMonth} (-${diff})` },
                            ]),
                        ],
                    });
                }

                await interaction.reply({ content: `${Emojis.checkmark} ・ Absen berhasil!`, ephemeral: true });
            } else {
                await interaction.reply({ content: `${Emojis.redcross} ・ Anda sudah absen hari ini.`, ephemeral: true });
            }
        }
    }
}
