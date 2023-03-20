"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const plugin_subcommands_1 = require("@sapphire/plugin-subcommands");
const libraries_1 = require("../../libraries");
class Command extends plugin_subcommands_1.Subcommand {
    constructor(context, options) {
        super(context, Object.assign({}, options));
        this.extendedDescription = options.extendedDescription;
        this.utils = new libraries_1.Utils();
    }
}
exports.Command = Command;
