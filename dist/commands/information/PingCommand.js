"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const time_utilities_1 = require("@sapphire/time-utilities");
const libraries_1 = require("../../libraries");
const discord_js_1 = require("discord.js");
let PingCommand = class PingCommand extends libraries_1.ICommand {
    registerApplicationCommands(registry) {
        const command = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: framework_1.RegisterBehavior.Overwrite,
            idHints: ["107833561794924967"],
            guildIds: [],
        });
    }
    chatInputRun(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            const msg = yield interaction.editReply({
                embeds: [this.utils.embed().setDescription(`${libraries_1.Emojis.loading} ・ Please wait...`)],
            });
            const wsLatency = Math.round(this.container.client.ws.ping);
            const apiLatency = msg.createdTimestamp - interaction.createdTimestamp;
            const ws = this.utils.lineCode(`${wsLatency.toLocaleString("us")}ms`);
            const api = this.utils.lineCode(`${apiLatency.toLocaleString("us")}ms`);
            yield interaction.editReply({
                embeds: [this.utils.embed().setDescription(`🏓 〢 **Websocket:** ${ws} ・ **Api latencyc:** ${api}`)],
            });
        });
    }
};
PingCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "ping",
        description: "Check Khemia's latency.",
        extendedDescription: {
            usage: "ping",
            examples: ["/ping"],
        },
        requiredClientPermissions: ["SendMessages"],
        requiredUserPermissions: ["SendMessages"],
        cooldownDelay: time_utilities_1.Time.Second * 3,
        cooldownFilteredUsers: [libraries_1.Developers[0]],
        preconditions: [],
    })
], PingCommand);
exports.PingCommand = PingCommand;
