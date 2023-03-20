import { EmbedBuilder } from "discord.js";
import { Colors } from "../..";

export class Embed extends EmbedBuilder {
    public constructor() {
        super();
        this.setColor(Colors.default);
    }

    isErrorEmbed(value: boolean): this {
        if (value) {
            this.setColor(Colors.error);
        }

        return this;
    }
}
