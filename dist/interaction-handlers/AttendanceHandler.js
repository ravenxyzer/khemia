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
exports.ParseExampleInteractionHandler = void 0;
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
let ParseExampleInteractionHandler = class ParseExampleInteractionHandler extends framework_1.InteractionHandler {
    parse(interaction) {
        if (interaction.customId == "attendance")
            return this.some();
        return this.none();
    }
    run(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = interaction.guild.channels.cache.get("1002433481567125574");
            if (!channel.isTextBased())
                return;
            channel.send({ content: "berhasil hore" });
        });
    }
};
ParseExampleInteractionHandler = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "attendance",
        interactionHandlerType: framework_1.InteractionHandlerTypes.Button,
    })
], ParseExampleInteractionHandler);
exports.ParseExampleInteractionHandler = ParseExampleInteractionHandler;
