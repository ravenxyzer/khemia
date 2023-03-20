import timers from "node:timers/promises";
import { Embed } from "..";

export class Utils {
    /**
     * @description Build mention of chat-input command (slash command).
     */
    buildCommandString(commandName: string, commandId: string): string {
        return `</${commandName}:${commandId}>`;
    }

    /**
     * @description Capitalize the first letter of a string.
     */
    capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * @description String to Discord code block format.
     */
    codeBlock(str: string): string {
        return `\`\`\`\n${str}\n\`\`\``;
    }
    /**
     * @description Inheritance embed builder
     */
    embed(): Embed {
        return new Embed();
    }

    /**
     * @description Format milliseconds into human readable format.
     */
    formatTime(ms: number): string {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 12);

        if (days > 0) {
            return `${days} days ${hours} hours ${minutes % 60} minutes`;
        } else if (hours > 0) {
            return `${hours} hours ${minutes % 60} minutes`;
        } else if (minutes > 0) {
            return `${minutes} minutes and ${seconds} seconds`;
        } else {
            return `${seconds} seconds`;
        }
    }

    /**
     * @description Format miliseconds into 00:00:00 format.
     */
    formatTimestamp(ms: number): string {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${this.pad(hours, 2)}:${this.pad(minutes % 60, 2)}:${this.pad(seconds % 60, 2)}`;
        } else if (minutes > 0) {
            return `${this.pad(minutes, 2)}:${this.pad(seconds % 60, 2)}`;
        } else {
            return `${this.pad(seconds, 2)}`;
        }
    }

    /**
     * @description Get random number with minimum and maximum limits
     */
    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @description String to Discord line code format
     */
    lineCode(str: string): string {
        return `\`${str}\``;
    }
    /**
     * @description Map urls into a markdown links.
     */
    mapUrls(urls: string[]): string {
        return urls.map((url) => `[${this.stripUrl(url)}](${url})`).join(" ");
    }

    /**
     * @description Convert minutes into milliseconds.
     */
    minutesToMs(minutes: number): number {
        return minutes * 60 * 1000;
    }

    /**
     * @description Convert milliseconds into seconds.
     */
    msToSeconds(ms: number): number {
        return ms / 1000;
    }

    /**
     * @description Pad a string with a certain length.
     */
    pad(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    /**
     * @description Randomize a array.
     */
    randomArray(array: string[]): string {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * @descriptionet Random integer between min and max, inclusive
     */
    randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @description Convert seconds into milliseconds.
     */
    secondsToMs(seconds: number): number {
        return seconds * 1000;
    }

    /**
     * @description Strip HTML tags from a tag.
     */
    stripHtmlTags(str: string): string {
        return str.replace(/<br\s*[\/]?>/gi, "\n").replace(/<[^>]*>/gi, "");
    }

    /**
     * @description Strip www and top level domain from a url.
     */
    stripUrl(url: string): string {
        return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];
    }

    /**
     * @description Convert User ID into user mention.
     */
    toMention(id: string): string {
        return `<@${id}>`;
    }

    /**
     * @description Trims a string to a certain length.
     */
    trimString(str: string, length: number): string {
        return str.length > length ? str.substring(0, length) + "..." : str;
    }

    /**
     * @description Wait before fulfilling the promise.
     */
    wait(ms: number): Promise<void> {
        return timers.setTimeout(ms);
    }
}
