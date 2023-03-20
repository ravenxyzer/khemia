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
exports.AvatarCommand = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const time_utilities_1 = require("@sapphire/time-utilities");
const libraries_1 = require("../../libraries");
const discord_js_1 = require("discord.js");
let AvatarCommand = class AvatarCommand extends libraries_1.ICommand {
    registerApplicationCommands(registry) {
        const command = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: framework_1.RegisterBehavior.Overwrite,
            idHints: ["1065203077856112660"],
            guildIds: [],
        });
    }
    chatInputRun(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ fetchReply: true });
            const user = interaction.user;
            const userInGuild = interaction.guild.members.cache.get(user.id);
            if (user.displayAvatarURL() !== userInGuild.displayAvatarURL()) {
                yield interaction.editReply({
                    embeds: [
                        this.utils.embed().setImage(user.displayAvatarURL({ size: 4096 })),
                        this.utils.embed().setImage(userInGuild.displayAvatarURL({ size: 4096 })),
                    ],
                    components: [
                        new discord_js_1.ActionRowBuilder().setComponents(new discord_js_1.ButtonBuilder().setStyle(discord_js_1.ButtonStyle.Link).setURL(user.displayAvatarURL({ size: 4096 }))),
                        new discord_js_1.ActionRowBuilder().setComponents(new discord_js_1.ButtonBuilder()
                            .setStyle(discord_js_1.ButtonStyle.Link)
                            .setURL(userInGuild.displayAvatarURL({ size: 4096 }))),
                    ],
                });
            }
            else {
                yield interaction.editReply({
                    embeds: [this.utils.embed().setImage(user.displayAvatarURL({ size: 4096 }))],
                    components: [
                        new discord_js_1.ActionRowBuilder().setComponents(new discord_js_1.ButtonBuilder().setStyle(discord_js_1.ButtonStyle.Link).setURL(user.displayAvatarURL({ size: 4096 }))),
                    ],
                });
            }
        });
    }
};
AvatarCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "avatar",
        description: "Display the user avatar.",
        extendedDescription: {
            usage: "avatar [user]",
            examples: ["/avatar", "/avatar @zarr"],
        },
        requiredClientPermissions: ["SendMessages"],
        requiredUserPermissions: ["SendMessages"],
        cooldownDelay: time_utilities_1.Time.Second * 3,
        cooldownFilteredUsers: [libraries_1.Developers[0]],
        preconditions: [],
    })
], AvatarCommand);
exports.AvatarCommand = AvatarCommand;
