"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICommand = void 0;
const plugin_subcommands_1 = require("@sapphire/plugin-subcommands");
const __1 = require("..");
class ICommand extends plugin_subcommands_1.Subcommand {
    constructor(context, options) {
        super(context, Object.assign({}, options));
        this.extendedDescription = options.extendedDescription;
        this.utils = new __1.Utils();
    }
}
exports.ICommand = ICommand;
