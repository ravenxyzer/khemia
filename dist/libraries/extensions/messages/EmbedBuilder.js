"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
const discord_js_1 = require("discord.js");
const __1 = require("../../");
class Embed extends discord_js_1.EmbedBuilder {
    constructor() {
        super();
        this.setColor(__1.Colors.default);
    }
    isErrorEmbed(value) {
        if (value) {
            this.setColor(__1.Colors.error);
        }
        return this;
    }
}
exports.Embed = Embed;
