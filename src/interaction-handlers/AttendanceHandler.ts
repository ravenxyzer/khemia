import { ApplyOptions } from "@sapphire/decorators";
import { InteractionHandlerTypes } from "@sapphire/framework";
import { PrismaClient } from "@prisma/client";
import { ButtonInteraction, EmbedBuilder, TextChannel } from "discord.js";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isYesterday from "dayjs/plugin/isYesterday";
dayjs.extend(utc);
dayjs.extend(isYesterday);

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
        const { user } = this.container.client;
        const channel: TextChannel = interaction.guild.channels.cache.get("1087844895726784612") as TextChannel;
        const prisma: PrismaClient = new PrismaClient();

        const embed: EmbedBuilder = funcs.embed();
        embed.setAuthor({ name: "Kehadiran Staff!", iconURL: user.displayAvatarURL({ size: 4096 }) });
        embed.setThumbnail(interaction.user.displayAvatarURL({ size: 4096 }));
        embed.setDescription(`${Emojis.checkmark} ・ ${interaction.user.tag} telah mengisi absen.`);
        embed.setFooter({ text: "Terima kasih sudah absen dan tingkatkan terus kehadiranmu!" });

        const now = dayjs().utcOffset(7);
        const daysInMonth = now.daysInMonth();

        const findUser = await prisma.user.findFirst({
            where: {
                userId: interaction.user.id,
            },
        });

        if (!findUser) {
            const newUser = await prisma.user.create({
                data: {
                    userId: interaction.user.id,
                    lastAttend: new Date(),
                    attendStreak: 1,
                    attendSum: 1,
                    attendPerMonth: 1,
                },
            });

            const attendPerMonth: number = newUser.attendPerMonth;
            const diff: number = daysInMonth - attendPerMonth;

            await interaction.reply({ content: `${Emojis.checkmark} ・ Absen berhasil!`, ephemeral: true });
            await channel.send({
                embeds: [
                    embed.addFields([
                        { name: "Waktu", value: `${now.format("HH:mm")} WIB` },
                        { name: "Total Kehadiran", value: `${newUser.attendSum} kali` },
                        { name: "Kehadiran Beruntun", value: `${newUser.attendStreak} kali` },
                        { name: "Absen Bulanan", value: `${attendPerMonth}/${daysInMonth} (-${diff} hari)` },
                    ]),
                ],
            });
        } else {
            const lastAttend = dayjs(findUser.lastAttend).utcOffset(7);

            if (lastAttend.isBefore(now, "day")) {
                // Attend success
                if (lastAttend.isBefore(now.subtract(1, "day"), "day")) {
                    // Streak failed
                    const nextMonth = now.month() > lastAttend.month();
                    const nextMonthAlsoNextYear = now.year() - lastAttend.year() == 1 && lastAttend.month() - now.month() == 11;
                    if (nextMonth || nextMonthAlsoNextYear) {
                        // Attend per month reset
                        const updatedUser = await prisma.user.update({
                            where: {
                                userId: interaction.user.id,
                            },
                            data: {
                                lastAttend: new Date(),
                                attendStreak: 1,
                                attendPerMonth: 1,
                                attendSum: { increment: 1 },
                            },
                        });

                        const attendPerMonth: number = updatedUser.attendPerMonth;
                        const diff: number = daysInMonth - attendPerMonth;

                        await interaction.reply({ content: `${Emojis.checkmark} ・ Absen berhasil!`, ephemeral: true });
                        await channel.send({
                            embeds: [
                                embed.addFields([
                                    { name: "Waktu", value: `${now.format("HH:mm")} WIB` },
                                    { name: "Total Kehadiran", value: `${updatedUser.attendSum} kali` },
                                    { name: "Kehadiran Beruntun", value: `${updatedUser.attendStreak} kali` },
                                    { name: "Absen Bulanan", value: `${attendPerMonth}/${daysInMonth} (-${diff} hari)` },
                                ]),
                            ],
                        });
                    } else {
                        // Attend per month increase
                        const updatedUser = await prisma.user.update({
                            where: {
                                userId: interaction.user.id,
                            },
                            data: {
                                lastAttend: new Date(),
                                attendStreak: 1,
                                attendPerMonth: { increment: 1 },
                                attendSum: { increment: 1 },
                            },
                        });

                        const attendPerMonth: number = updatedUser.attendPerMonth;
                        const diff: number = daysInMonth - attendPerMonth;

                        await interaction.reply({ content: `${Emojis.checkmark} ・ Absen berhasil!`, ephemeral: true });
                        await channel.send({
                            embeds: [
                                embed.addFields([
                                    { name: "Waktu", value: `${now.format("HH:mm")} WIB` },
                                    { name: "Total Kehadiran", value: `${updatedUser.attendSum} kali` },
                                    { name: "Kehadiran Beruntun", value: `${updatedUser.attendStreak} kali` },
                                    { name: "Absen Bulanan", value: `${attendPerMonth}/${daysInMonth} (-${diff} hari)` },
                                ]),
                            ],
                        });
                    }
                } else {
                    // Streak success
                    const nextMonth = now.month() > lastAttend.month();
                    const nextMonthAlsoNextYear = now.year() - lastAttend.year() == 1 && lastAttend.month() - now.month() == 11;
                    if (nextMonth || nextMonthAlsoNextYear) {
                        // Attend per month reset
                        const updatedUser = await prisma.user.update({
                            where: {
                                userId: interaction.user.id,
                            },
                            data: {
                                lastAttend: new Date(),
                                attendStreak: { increment: 1 },
                                attendPerMonth: 1,
                                attendSum: { increment: 1 },
                            },
                        });

                        const attendPerMonth: number = updatedUser.attendPerMonth;
                        const diff: number = daysInMonth - attendPerMonth;

                        await interaction.reply({ content: `${Emojis.checkmark} ・ Absen berhasil!`, ephemeral: true });
                        await channel.send({
                            embeds: [
                                embed.addFields([
                                    { name: "Waktu", value: `${now.format("HH:mm")} WIB` },
                                    { name: "Total Kehadiran", value: `${updatedUser.attendSum} kali` },
                                    { name: "Kehadiran Beruntun", value: `${updatedUser.attendStreak} kali` },
                                    { name: "Absen Bulanan", value: `${attendPerMonth}/${daysInMonth} (-${diff} hari)` },
                                ]),
                            ],
                        });
                    } else {
                        // Attend per month increase
                        const updatedUser = await prisma.user.update({
                            where: {
                                userId: interaction.user.id,
                            },
                            data: {
                                lastAttend: new Date(),
                                attendStreak: { increment: 1 },
                                attendPerMonth: { increment: 1 },
                                attendSum: { increment: 1 },
                            },
                        });

                        const attendPerMonth: number = updatedUser.attendPerMonth;
                        const diff: number = daysInMonth - attendPerMonth;

                        await interaction.reply({ content: `${Emojis.checkmark} ・ Absen berhasil!`, ephemeral: true });
                        await channel.send({
                            embeds: [
                                embed.addFields([
                                    { name: "Waktu", value: `${now.format("HH:mm")} WIB` },
                                    { name: "Total Kehadiran", value: `${updatedUser.attendSum} kali` },
                                    { name: "Kehadiran Beruntun", value: `${updatedUser.attendStreak} kali` },
                                    { name: "Absen Bulanan", value: `${attendPerMonth}/${daysInMonth} (-${diff} hari)` },
                                ]),
                            ],
                        });
                    }
                }
            } else {
                // Attend failed or already attend
                await interaction.reply({ content: `${Emojis.redcross} ・ Anda sudah absen hari ini.`, ephemeral: true });
            }
        }
    }
}
