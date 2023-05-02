import { PreconditionOptions, AllFlowsPrecondition, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Moderators } from "../libraries";
import type { Message } from "discord.js";

@ApplyOptions<PreconditionOptions>({
    name: "ModeratorOnly",
})
export class ModeratorOnlyPrecondition extends AllFlowsPrecondition {
    public override async messageRun(message: Message) {
        return Moderators.includes(message.author.id)
            ? this.ok()
            : this.error({
                  identifier: "preconditionModeratorOnly",
              });
    }

    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        return Moderators.includes(interaction.user.id)
            ? this.ok()
            : this.error({
                  identifier: "preconditionModeratorOnly",
              });
    }

    public override async contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
        return Moderators.includes(interaction.user.id)
            ? this.ok()
            : this.error({
                  identifier: "preconditionModeratorOnly",
              });
    }
}
