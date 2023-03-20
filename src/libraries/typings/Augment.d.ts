import { Subcommand } from "@sapphire/plugin-subcommands";

import { Utils } from "..";
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

declare module "@sapphire/pieces" {
    interface Container {
        utils: Utils;
        database: IDatabase;
    }
}
