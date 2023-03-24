import { ApplyOptions } from "@sapphire/decorators";
import { Message } from "discord.js";

import { Command } from "../../libraries";

@ApplyOptions<Command.Options>({
    name: "test",
    description: "Testing command.",
    extendedDescription: {
        usage: "test",
    },
    requiredClientPermissions: ["SendMessages"],
    requiredUserPermissions: ["SendMessages"],
    preconditions: ["OwnerOnly"],
})
export class TestCommand extends Command {
    public override async messageRun(message: Message): Promise<void> {}
}
