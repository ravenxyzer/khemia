import { LogLevel, SapphireClient } from "@sapphire/framework";
import { Time } from "@sapphire/time-utilities";
import { Partials } from "discord.js";
import { Utils } from "..";

export class Client extends SapphireClient {
    utils: Utils;

    public constructor() {
        super({
            allowedMentions: {
                parse: ["roles", "users"],
            },
            caseInsensitiveCommands: true,
            caseInsensitivePrefixes: true,
            defaultPrefix: "k-",
            defaultCooldown: {
                delay: Time.Second * 3,
            },
            enableLoaderTraceLoggings: false,
            intents: [
                "AutoModerationConfiguration",
                "AutoModerationExecution",
                "DirectMessageReactions",
                "DirectMessageTyping",
                "DirectMessages",
                "GuildBans",
                "GuildEmojisAndStickers",
                "GuildIntegrations",
                "GuildInvites",
                "GuildMembers",
                "GuildMessageReactions",
                "GuildMessageTyping",
                "GuildMessages",
                "GuildPresences",
                "GuildScheduledEvents",
                "GuildVoiceStates",
                "GuildWebhooks",
                "Guilds",
                "MessageContent",
            ],
            loadDefaultErrorListeners: false,
            loadMessageCommandListeners: true,
            logger: {
                level: LogLevel.Debug,
            },
            partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
            typing: true,
        });

        this.utils = new Utils();
    }

    public login(token: string): Promise<string> {
        return super.login(token);
    }

    public destroy(): void {
        return super.destroy();
    }
}
