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
exports.AttendanceCommand = void 0;
const builders_1 = require("@discordjs/builders");
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
const libraries_1 = require("../../libraries");
let AttendanceCommand = class AttendanceCommand extends libraries_1.ICommand {
    messageRun(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message.delete();
            message.channel.send({
                embeds: [this.utils.embed().setDescription("absen lah")],
                components: [
                    new discord_js_1.ActionRowBuilder().setComponents(new builders_1.ButtonBuilder()
                        .setCustomId("attendance")
                        .setLabel("Absen disini!")
                        .setStyle(discord_js_1.ButtonStyle.Secondary)),
                ],
            });
        });
    }
};
AttendanceCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "attendance",
        aliases: ["absen"],
        description: "",
        extendedDescription: {
            usage: "",
        },
        requiredUserPermissions: ["SendMessages"],
        requiredClientPermissions: ["SendMessages"],
        preconditions: ["OwnerOnly"],
    })
], AttendanceCommand);
exports.AttendanceCommand = AttendanceCommand;
