import { InteractionHandler as BaseInteractionHandler } from "@sapphire/framework";

export abstract class InteractionHandler extends BaseInteractionHandler {
    constructor(context: BaseInteractionHandler.Context, options?: BaseInteractionHandler.Options) {
        super(context, { ...options });
    }
}

export declare namespace InteractionHandler {
    type Options = BaseInteractionHandler.Options;
    type JSON = BaseInteractionHandler.JSON;
    type Context = BaseInteractionHandler.Context;
}
