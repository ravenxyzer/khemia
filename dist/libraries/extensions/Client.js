"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const framework_1 = require("@sapphire/framework");
const time_utilities_1 = require("@sapphire/time-utilities");
const discord_js_1 = require("discord.js");
const __1 = require("..");
class Client extends framework_1.SapphireClient {
    constructor() {
        super({
            allowedMentions: {
                parse: ["roles", "users"],
            },
            caseInsensitiveCommands: true,
            caseInsensitivePrefixes: true,
            defaultPrefix: "k-",
            defaultCooldown: {
                delay: time_utilities_1.Time.Second * 3,
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
                level: framework_1.LogLevel.Debug,
            },
            partials: [discord_js_1.Partials.Channel, discord_js_1.Partials.GuildMember, discord_js_1.Partials.Message, discord_js_1.Partials.Reaction],
            typing: true,
        });
        this.utils = new __1.Utils();
    }
    login(token) {
        return super.login(token);
    }
    destroy() {
        return super.destroy();
    }
}
exports.Client = Client;
