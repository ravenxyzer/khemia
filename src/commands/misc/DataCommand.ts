import { RegisterBehavior } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { PrismaClient } from "@prisma/client";
import { SlashCommandBuilder, InteractionResponse } from "discord.js";

import { Command } from "../../libraries";

@ApplyOptions<Command.Options>({
    name: "data",
    description: "@joki_faun pricelist",
    extendedDescription: {
        usage: "data add | delete",
    },
    requiredClientPermissions: ["SendMessages"],
    requiredUserPermissions: ["SendMessages"],
    preconditions: ["ModeratorOnly"],
    subcommands: [{ name: "add", chatInputRun: "addData" }],
})
export class PricelistCommand extends Command {
    public override registerApplicationCommands(registry: Command.Registry) {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("add")
                    .setDescription("Add data to pricelist")
                    .addStringOption((option) =>
                        option
                            .setName("category")
                            .setDescription("Choose a category to update with.")
                            .setRequired(true)
                            .addChoices(
                                { name: "Oculi", value: "oculi" },
                                { name: "Materials", value: "materials" },
                                { name: "Chunks", value: "chunks" },
                                { name: "Bosses", value: "bosses" },
                                { name: "Domains", value: "domains" },
                                { name: "Weapons", value: "weapons" },
                                { name: "Main Quests", value: "mainQuests" },
                                { name: "World Quests", value: "worldQuests" }
                            )
                    )
                    .addStringOption((option) => option.setName("name").setDescription("The name of the data").setRequired(true))
                    .addNumberOption((option) => option.setName("price").setDescription("The price of the data").setRequired(true))
            );

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: ["909618952634781716"],
            idHints: [],
        });
    }

    public async addData(interaction: Command.ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
        const category: string = interaction.options.getString("category");
        const name: string = interaction.options.getString("name");
        const price: number = interaction.options.getNumber("price");

        const prisma: PrismaClient = new PrismaClient();
        const pricelist = await prisma.pricelist.findUnique({ where: { uniqueId: "_pricelist" } });

        if (!pricelist) return interaction.reply({ content: "Cannot fetch data from database" });

        if (category == "oculi") {
            let container = pricelist.oculi;
            container.push(`${name}・Rp. ${price.toLocaleString("us")}`);

            await prisma.pricelist.update({
                where: { uniqueId: "_pricelist" },
                data: { oculi: container },
            });

            return interaction.reply({ content: `Add data success: [${category}]`, ephemeral: true });
        } else if (category === "materials") {
            let container = pricelist.materials;
            container.push(`${name}・Rp. ${price.toLocaleString("us")}`);

            await prisma.pricelist.update({
                where: { uniqueId: "_pricelist" },
                data: { materials: container },
            });

            return interaction.reply({ content: `Add data success: [${category}]`, ephemeral: true });
        } else if (category === "chunks") {
            let container = pricelist.chunks;
            container.push(`${name}・Rp. ${price.toLocaleString("us")}`);

            await prisma.pricelist.update({
                where: { uniqueId: "_pricelist" },
                data: { chunks: container },
            });

            return interaction.reply({ content: `Add data success: [${category}]`, ephemeral: true });
        } else if (category === "bosses") {
            let container = pricelist.bosses;
            container.push(`${name}・Rp. ${price.toLocaleString("us")}`);

            await prisma.pricelist.update({
                where: { uniqueId: "_pricelist" },
                data: { bosses: container },
            });

            return interaction.reply({ content: `Add data success: [${category}]`, ephemeral: true });
        } else if (category === "domains") {
            let container = pricelist.domains;
            container.push(`${name}・Rp. ${price.toLocaleString("us")}`);

            await prisma.pricelist.update({
                where: { uniqueId: "_pricelist" },
                data: { domains: container },
            });

            return interaction.reply({ content: `Add data success: [${category}]`, ephemeral: true });
        } else if (category === "weapons") {
            let container = pricelist.weapons;
            container.push(`${name}・Rp. ${price.toLocaleString("us")}`);

            await prisma.pricelist.update({
                where: { uniqueId: "_pricelist" },
                data: { weapons: container },
            });

            return interaction.reply({ content: `Add data success: [${category}]`, ephemeral: true });
        } else if (category === "mainQuests") {
            let container = pricelist.mainQuests;
            container.push(`${name}・Rp. ${price.toLocaleString("us")}`);

            await prisma.pricelist.update({
                where: { uniqueId: "_pricelist" },
                data: { mainQuests: container },
            });

            return interaction.reply({ content: `Add data success: [${category}]`, ephemeral: true });
        } else if (category === "worldQuests") {
            let container = pricelist.worldQuests;
            container.push(`${name}・Rp. ${price.toLocaleString("us")}`);

            await prisma.pricelist.update({
                where: { uniqueId: "_pricelist" },
                data: { worldQuests: container },
            });

            return interaction.reply({ content: `Add data success: [${category}]`, ephemeral: true });
        }
    }
}
