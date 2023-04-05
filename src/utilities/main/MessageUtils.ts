import { ApplyOptions } from "@sapphire/decorators";
import { Utility } from "@sapphire/plugin-utilities-store";

@ApplyOptions<Utility.Options>({
    name: "message",
})
export class MessageUtils extends Utility {
    /**
     * @description Capitalize the first letter of a string.
     */
    public capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * @description String to Discord code block chat formatting.
     */
    public codeBlock(str: string, language?: string): string {
        if (!language) {
            return `\`\`\`\n${str}\n\`\`\``;
        }

        return `\`\`\`${language}\n${str}\n\`\`\``;
    }

    /**
     * @description String to Discord line code chat formatting.
     */
    public lineCode(str: string): string {
        return `\`${str}\``;
    }

    /**
     * @description Build a mention of chat-input command (slash command).
     */
    public mentionSlashCommand(commandName: string, commandId: string): string {
        return `</${commandName}:${commandId}>`;
    }

    /**
     * @description Convert User ID into user mention.
     */
    public mentionUser(id: string): string {
        return `<@${id}>`;
    }
}
