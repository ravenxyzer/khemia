import { InteractionHandler as BaseInteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { Utils, Database } from "..";

export abstract class InteractionHandler extends BaseInteractionHandler {
    utils: Utils;
    database: Database;

    constructor(context: BaseInteractionHandler.Context, options?: BaseInteractionHandler.Options) {
        super(context, { ...options });

        this.utils = new Utils();
        this.database = new Database();
    }
}

export declare namespace InteractionHandler {
    type Options = BaseInteractionHandler.Options;
    type JSON = BaseInteractionHandler.JSON;
    type Context = BaseInteractionHandler.Context;
}
