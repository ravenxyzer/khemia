import { ApplyOptions } from "@sapphire/decorators";
import { Utility } from "@sapphire/plugin-utilities-store";
import { setTimeout } from "node:timers/promises";

import { EmbedBuilder } from "../libraries";

@ApplyOptions<Utility.Options>({
    name: "funcs",
})
export class FunctionUtils extends Utility {
    /**
     * @description Khemia embed builder.
     */
    public embed(): EmbedBuilder {
        return new EmbedBuilder();
    }

    /**
     * @description Get random number with minimum and maximum limits
     */
    public getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @description Randomize a array.
     */
    public randomArray(array: string[]): string {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * @description Trims a string to a certain length.
     */
    public trimString(str: string, length: number): string {
        return str.length > length ? str.substring(0, length) + "..." : str;
    }

    /**
     * @description Wait before fulfilling the promise.
     */
    public wait(ms: number): Promise<void> {
        return setTimeout(ms);
    }
}
