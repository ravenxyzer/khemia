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
exports.ContextMenuCommandDeniedListener = exports.ChatInputCommandDeniedListener = exports.MessageCommandDeniedListener = void 0;
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
const libraries_1 = require("../../libraries");
let MessageCommandDeniedListener = class MessageCommandDeniedListener extends libraries_1.IListener {
    run(error, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = this.utils.embed().isErrorEmbed(true);
            switch (error.identifier) {
                case framework_1.Identifiers.PreconditionCooldown:
                    embed.setDescription("🛑・The command you are using is on cooldown!");
                    return data.message.reply({ embeds: [embed] });
                case framework_1.Identifiers.PreconditionClientPermissions || framework_1.Identifiers.PreconditionClientPermissionsNoPermissions:
                    embed.setDescription(`🛑・Bot has no permission!\nPerms needed: ${error.context}`);
                    return data.message.reply({ embeds: [embed] });
                case framework_1.Identifiers.PreconditionUserPermissions || framework_1.Identifiers.PreconditionUserPermissionsNoPermissions:
                    embed.setDescription("🛑・User has no permission!");
                    return data.message.reply({ embeds: [embed] });
                case "preconditionOwnerOnly" /* Identifiers.PreconditionOwnerOnly */:
                    embed.setDescription("🛑・Only owner can run this command!");
                    return data.message.reply({ embeds: [embed] });
                case "preconditionDbConnectedOnly" /* Identifiers.PreconditionDbConnectedOnly */:
                    embed.setDescription("🛑・Cannot run this command, try again later.");
                    return data.message.reply({ embeds: [embed] });
                default:
                    embed.setDescription(`🛑・${error.identifier} | ${error.message}`);
                    return data.message.reply({ embeds: [embed] });
            }
        });
    }
};
MessageCommandDeniedListener = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "MessageCommandDenied",
        once: false,
        event: framework_1.Events.MessageCommandDenied,
    })
], MessageCommandDeniedListener);
exports.MessageCommandDeniedListener = MessageCommandDeniedListener;
let ChatInputCommandDeniedListener = class ChatInputCommandDeniedListener extends libraries_1.IListener {
    run(error, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = this.utils.embed().isErrorEmbed(true);
            switch (error.identifier) {
                case framework_1.Identifiers.PreconditionCooldown:
                    embed.setDescription("🛑・The command you are using is on cooldown!");
                    return data.interaction.reply({ embeds: [embed] });
                case framework_1.Identifiers.PreconditionClientPermissions || framework_1.Identifiers.PreconditionClientPermissionsNoPermissions:
                    embed.setDescription(`🛑・Bot has no permission!\nPerms needed: ${error.context}`);
                    return data.interaction.reply({ embeds: [embed] });
                case framework_1.Identifiers.PreconditionUserPermissions || framework_1.Identifiers.PreconditionUserPermissionsNoPermissions:
                    embed.setDescription("🛑・User has no permission!");
                    return data.interaction.reply({ embeds: [embed] });
                case "preconditionOwnerOnly" /* Identifiers.PreconditionOwnerOnly */:
                    embed.setDescription("🛑・Only owner can run this command!");
                    return data.interaction.reply({ embeds: [embed] });
                case "preconditionDbConnectedOnly" /* Identifiers.PreconditionDbConnectedOnly */:
                    embed.setDescription("🛑・Cannot run this command, try again later.");
                    return data.interaction.reply({ embeds: [embed] });
                default:
                    embed.setDescription(`🛑・${error.identifier}\n${this.utils.codeBlock(error.message)}`);
                    return data.interaction.reply({ embeds: [embed] });
            }
        });
    }
};
ChatInputCommandDeniedListener = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "ChatInputCommandDenied",
        once: false,
        event: framework_1.Events.ChatInputCommandDenied,
    })
], ChatInputCommandDeniedListener);
exports.ChatInputCommandDeniedListener = ChatInputCommandDeniedListener;
let ContextMenuCommandDeniedListener = class ContextMenuCommandDeniedListener extends libraries_1.IListener {
    run(error, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = this.utils.embed().isErrorEmbed(true);
            switch (error.identifier) {
                case framework_1.Identifiers.PreconditionCooldown:
                    embed.setDescription("🛑・The command you are using is on cooldown!");
                    return data.interaction.reply({ embeds: [embed] });
                case framework_1.Identifiers.PreconditionClientPermissions || framework_1.Identifiers.PreconditionClientPermissionsNoPermissions:
                    embed.setDescription(`🛑・Bot has no permission!\nPerms needed: ${error.context}`);
                    return data.interaction.reply({ embeds: [embed] });
                case framework_1.Identifiers.PreconditionUserPermissions || framework_1.Identifiers.PreconditionUserPermissionsNoPermissions:
                    embed.setDescription("🛑・User has no permission!");
                    return data.interaction.reply({ embeds: [embed] });
                case "preconditionOwnerOnly" /* Identifiers.PreconditionOwnerOnly */:
                    embed.setDescription("🛑・Only owner can run this command!");
                    return data.interaction.reply({ embeds: [embed] });
                case "preconditionDbConnectedOnly" /* Identifiers.PreconditionDbConnectedOnly */:
                    embed.setDescription("🛑・Cannot run this command, try again later.");
                    return data.interaction.reply({ embeds: [embed] });
                default:
                    embed.setDescription(`🛑・${error.identifier}\n${this.utils.codeBlock(error.message)}`);
                    return data.interaction.reply({ embeds: [embed] });
            }
        });
    }
};
ContextMenuCommandDeniedListener = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "ContextMenuCommandDenied",
        once: false,
        event: framework_1.Events.ContextMenuCommandDenied,
    })
], ContextMenuCommandDeniedListener);
exports.ContextMenuCommandDeniedListener = ContextMenuCommandDeniedListener;
