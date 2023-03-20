import { Listener as BaseListener, ListenerOptions } from "@sapphire/framework";
import { Utils } from "..";

export abstract class Listener extends BaseListener {
    utils: Utils;

    constructor(context: BaseListener.Context, options?: ListenerOptions) {
        super(context, { ...options });

        this.utils = new Utils();
    }
}

export declare namespace Listener {
    type Options = ListenerOptions;
    type JSON = BaseListener.JSON;
    type Context = BaseListener.Context;
}
