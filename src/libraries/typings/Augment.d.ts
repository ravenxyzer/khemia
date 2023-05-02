import { Subcommand } from "@sapphire/plugin-subcommands";

import { FunctionUtils, TimeUtils, MessageUtils } from "../../utilities";
import * as Preconditions from "../../preconditions";

declare module "@sapphire/framework" {
    interface Preconditions {
        OwnerOnly: never;
        ModeratorOnly: never;
    }

    const enum Identifiers {
        PreconditionOwnerOnly = "preconditionOwnerOnly",
        PreconditionModeratorOnly = "preconditionModeratorOnly",
    }
}

declare module "@sapphire/plugin-utilities-store" {
    export interface Utilities {
        funcs: FunctionUtils;
        message: MessageUtils;
        time: TimeUtils;
    }
}
