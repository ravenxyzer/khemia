import { RegisterBehavior } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { PaginatedMessage } from "@sapphire/discord.js-utilities";
import { PrismaClient } from "@prisma/client";
import { GuildMember, codeBlock, SlashCommandBuilder, ComponentType } from "discord.js";

import { Command } from "../../libraries";

@ApplyOptions<Command.Options>({
    name: "pricelist",
    description: "@joki_faun pricelist",
    extendedDescription: {
        usage: "pricelist",
    },
    requiredClientPermissions: ["SendMessages"],
    requiredUserPermissions: ["SendMessages"],
    preconditions: ["ModeratorOnly"],
})
export class PricelistCommand extends Command {
    public override registerApplicationCommands(registry: Command.Registry) {
        const command: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: ["909618952634781716"],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
        await this.showPricelist(interaction);
    }

    private async showPricelist(ctx: Command.ChatInputCommandInteraction) {
        const prisma: PrismaClient = new PrismaClient();
        const paginate: PaginatedMessage = new PaginatedMessage();
        const joki_faun: GuildMember = await ctx.guild.members.fetch("428859474862931970");

        const pricelist = await prisma.pricelist.findFirst({
            where: {
                uniqueId: "_pricelist",
            },
        });

        if (!pricelist) {
            await prisma.pricelist.create({
                data: {
                    uniqueId: "_pricelist",
                    oculi: [],
                    materials: [],
                    chunks: [],
                    bosses: [],
                    domains: [],
                    weapons: [],
                    mainQuests: [],
                    worldQuests: [],
                },
            });

            return ctx.reply({ content: "Database has been created!" });
        }
        const container = [
            pricelist.oculi.length == 0 ? "None" : pricelist.oculi.join("\n"),
            pricelist.materials.length == 0 ? "None" : pricelist.materials.join("\n"),
            pricelist.chunks.length == 0 ? "None" : pricelist.chunks.join("\n"),
            pricelist.bosses.length == 0 ? "None" : pricelist.bosses.join("\n"),
            pricelist.domains.length == 0 ? "None" : pricelist.domains.join("\n"),
            pricelist.weapons.length == 0 ? "None" : pricelist.weapons.join("\n"),
            pricelist.mainQuests.length == 0 ? "None" : pricelist.mainQuests.join("\n"),
            pricelist.worldQuests.length == 0 ? "None" : pricelist.worldQuests.join("\n"),
        ];

        const pricelistCategories = ["Oculi", "Materials", "Chunks", "Bosses", "Domains", "Weapons", "Main Quests", "World Quests"];

        for (const [index] of pricelistCategories.entries()) {
            paginate.addPageEmbed((embed) => {
                embed
                    .setAuthor({
                        name: "Joki Faun Pricelist",
                        iconURL: joki_faun.displayAvatarURL({ size: 4096 }),
                    })
                    .addFields([{ name: `⊰・${pricelistCategories[index]}・⊱`, value: codeBlock(container[index]) }])
                    .setFooter({ text: "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ" });

                return embed;
            });
        }

        paginate.pageIndexPrefix = " ";

        const selectMenuOptions: {
            label: string;
            description: string;
            value: string;
        }[] = [];

        pricelistCategories.forEach((option) => {
            selectMenuOptions.push({
                label: option,
                description: `Select ${option}`,
                value: option,
            });
        });

        paginate.setActions([
            {
                customId: "userinfo-command-select-menu",
                type: ComponentType.StringSelect,
                emoji: "🧪",
                options: selectMenuOptions,
                placeholder: "Select an option",
                run: ({ handler, interaction }) => {
                    if (interaction.isStringSelectMenu()) {
                        handler.index = pricelistCategories.indexOf(interaction.values[0]);
                    }
                },
            },
        ]);

        return paginate.run(ctx);
    }
}
