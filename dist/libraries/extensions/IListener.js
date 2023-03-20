"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IListener = void 0;
const framework_1 = require("@sapphire/framework");
const __1 = require("..");
class IListener extends framework_1.Listener {
    constructor(context, options) {
        super(context, Object.assign({}, options));
        this.utils = new __1.Utils();
    }
}
exports.IListener = IListener;
