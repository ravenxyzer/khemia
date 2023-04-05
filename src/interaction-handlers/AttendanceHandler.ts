import { ApplyOptions } from "@sapphire/decorators";
import { InteractionHandlerTypes } from "@sapphire/framework";
import { PrismaClient } from "@prisma/client";
import { ButtonInteraction, EmbedBuilder, TextChannel } from "discord.js";

import dayjs, { Dayjs } from "dayjs";
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
        const { user } = this.container.client;

        const prisma: PrismaClient = new PrismaClient();
        const channel: TextChannel = this.getTextChannel(interaction, "1087844895726784612");

        const currentTime: Dayjs = dayjs().utcOffset(7);
        const currentDaysInMonth: number = currentTime.daysInMonth();

        const embed: EmbedBuilder = funcs
            .embed()
            .setAuthor({ name: "Kehadiran Staff!", iconURL: user.displayAvatarURL({ size: 4096 }) })
            .setThumbnail(interaction.user.displayAvatarURL({ size: 4096 }))
            .setDescription(`${Emojis.checkmark} ・ ${interaction.user.tag} telah mengisi absen.`)
            .setFooter({ text: "Terima kasih sudah absen dan tingkatkan terus kehadiranmu!" });

        const getUser = await prisma.user.findFirst({
            where: {
                userId: interaction.user.id,
            },
        });

        if (!getUser) {
            const createdUser = await prisma.user.create({
                data: { userId: interaction.user.id, lastAttend: new Date(), attendStreak: 1, attendSum: 1, attendPerMonth: 1 },
            });

            const attendPerMonthSum: number = createdUser.attendPerMonth;
            const diff: number = attendPerMonthSum - currentDaysInMonth;

            await interaction.reply({ content: `${Emojis.checkmark} ・ Absen berhasil!`, ephemeral: true });
            await channel.send({
                embeds: [
                    embed.addFields([
                        { name: "Waktu", value: `${currentTime.format("HH:mm")} WIB` },
                        { name: "Total Kehadiran", value: `${createdUser.attendSum} kali` },
                        { name: "Kehadiran Beruntun", value: `${createdUser.attendStreak} kali` },
                        { name: "Absen Bulanan", value: `${attendPerMonthSum}/${currentDaysInMonth} (${diff} hari)` },
                    ]),
                ],
            });
        } else {
            const lastAttend: Dayjs = dayjs(getUser.lastAttend).utcOffset(7);
            const attendStreak = this.isStreakFailed(lastAttend, currentTime) ? 1 : { increment: 1 };
            const attendPerMonth = this.isNextMonth(lastAttend, currentTime) ? 1 : { increment: 1 };

            // Attend Success
            if (this.isBeforeDay(lastAttend, currentTime)) {
                const updatedUser = await prisma.user.update({
                    where: { userId: interaction.user.id },
                    data: { lastAttend: new Date(), attendStreak, attendPerMonth, attendSum: { increment: 1 } },
                });

                const attendPerMonthSum: number = updatedUser.attendPerMonth;
                const diff: number = attendPerMonthSum - currentDaysInMonth;

                await interaction.reply({ content: `${Emojis.checkmark} ・ Absen berhasil!`, ephemeral: true });
                await channel.send({
                    embeds: [
                        embed.addFields([
                            { name: "Waktu", value: `${currentTime.format("HH:mm")} WIB` },
                            { name: "Total Kehadiran", value: `${updatedUser.attendSum} kali` },
                            { name: "Kehadiran Beruntun", value: `${updatedUser.attendStreak} kali` },
                            { name: "Absen Bulanan", value: `${attendPerMonthSum}/${currentDaysInMonth} (${diff} hari)` },
                        ]),
                    ],
                });
            } else {
                await interaction.reply({ content: `${Emojis.redcross} ・ Anda sudah absen hari ini.`, ephemeral: true });
            }
        }
    }

    private getTextChannel(ctx: ButtonInteraction, id: string): TextChannel {
        return ctx.guild.channels.cache.get(id) as TextChannel;
    }

    private isBeforeDay(lastDay: Dayjs, currentDay: Dayjs): boolean {
        return lastDay.isBefore(currentDay, "day");
    }

    private isStreakFailed(lastDay: Dayjs, currentDay: Dayjs): boolean {
        return lastDay.isBefore(currentDay.subtract(1, "day"), "day");
    }

    private isNextMonth(last: Dayjs, current: Dayjs): boolean {
        return current.month() > last.month() || current.year() > last.year();
    }
}
