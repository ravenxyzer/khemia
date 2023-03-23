import { Subcommand } from "@sapphire/plugin-subcommands";

import { Utils, TimeUtils, MessageUtils } from "../../utilities";
import * as Preconditions from "../../preconditions";

declare module "@sapphire/framework" {
    interface Preconditions {
        DbConnectedOnly: never;
        OwnerOnly: never;
    }

    const enum Identifiers {
        PreconditionDbConnectedOnly = "preconditionDbConnectedOnly",
        PreconditionOwnerOnly = "preconditionOwnerOnly",
    }
}

declare module "@sapphire/plugin-utilities-store" {
    export interface Utilities {
        utils: Utils;
        message: MessageUtils;
        time: TimeUtils;
    }
}
