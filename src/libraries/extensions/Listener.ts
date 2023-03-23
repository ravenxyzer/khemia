import { Listener as BaseListener, ListenerOptions } from "@sapphire/framework";

export abstract class Listener extends BaseListener {
    constructor(context: BaseListener.Context, options?: ListenerOptions) {
        super(context, { ...options });
    }
}

export declare namespace Listener {
    type Options = ListenerOptions;
    type JSON = BaseListener.JSON;
    type Context = BaseListener.Context;
}
