import { Subcommand, SubcommandOptions } from "@sapphire/plugin-subcommands";
import { Utils } from "..";

export interface CommandExtendedDescription {
    usage: string;
    examples?: string[];
}

export interface CommandOptions extends SubcommandOptions {
    description: string;
    extendedDescription?: CommandExtendedDescription;
}

export abstract class Command extends Subcommand {
    extendedDescription: CommandExtendedDescription;
    utils: Utils;

    constructor(context: Subcommand.Context, options: CommandOptions) {
        super(context, { ...options });

        this.extendedDescription = options.extendedDescription;
        this.utils = new Utils();
    }
}

export declare namespace Command {
    type Options = CommandOptions;
    type JSON = Subcommand.JSON;
    type Context = Subcommand.Context;
    type RunInTypes = Subcommand.RunInTypes;
    type ChatInputCommandInteraction = Subcommand.ChatInputCommandInteraction;
    type ContextMenuCommandInteraction = Subcommand.ContextMenuCommandInteraction;
    type AutocompleteInteraction = Subcommand.AutocompleteInteraction;
    type Registry = Subcommand.Registry;
}
