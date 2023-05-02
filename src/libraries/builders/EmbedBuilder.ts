import { EmbedBuilder as BaseEmbedBuilder } from "discord.js";
import { Colors } from "..";

export class EmbedBuilder extends BaseEmbedBuilder {
    public constructor() {
        super();
        this.setColor(Colors.default);
    }

    isErrorEmbed(): this {
        this.setColor(Colors.error);

        return this;
    }
}
