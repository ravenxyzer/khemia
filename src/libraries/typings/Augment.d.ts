import { Subcommand } from "@sapphire/plugin-subcommands";

import { FunctionUtils, TimeUtils, MessageUtils } from "../../utilities";
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
        funcs: FunctionUtils;
        message: MessageUtils;
        time: TimeUtils;
    }
}
