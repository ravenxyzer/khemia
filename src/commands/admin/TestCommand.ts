import { ApplyOptions } from "@sapphire/decorators";
import { Message } from "discord.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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
export class AttendanceCommand extends Command {
    public override async messageRun(message: Message): Promise<void> {
        dayjs.extend(utc);

        const now = dayjs().utcOffset(7).date();
        await message.channel.send(`Jam ${now}`);
    }
}
