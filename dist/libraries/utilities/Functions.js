"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const promises_1 = __importDefault(require("node:timers/promises"));
const __1 = require("..");
class Utils {
    /**
     * @description Build mention of chat-input command (slash command).
     */
    buildCommandString(commandName, commandId) {
        return `</${commandName}:${commandId}>`;
    }
    /**
     * @description Capitalize the first letter of a string.
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    /**
     * @description String to Discord code block format.
     */
    codeBlock(str) {
        return `\`\`\`\n${str}\n\`\`\``;
    }
    /**
     * @description Inheritance embed builder
     */
    embed() {
        return new __1.Embed();
    }
    /**
     * @description Format milliseconds into human readable format.
     */
    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 12);
        if (days > 0) {
            return `${days} days ${hours} hours ${minutes % 60} minutes`;
        }
        else if (hours > 0) {
            return `${hours} hours ${minutes % 60} minutes`;
        }
        else if (minutes > 0) {
            return `${minutes} minutes and ${seconds} seconds`;
        }
        else {
            return `${seconds} seconds`;
        }
    }
    /**
     * @description Format miliseconds into 00:00:00 format.
     */
    formatTimestamp(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
            return `${this.pad(hours, 2)}:${this.pad(minutes % 60, 2)}:${this.pad(seconds % 60, 2)}`;
        }
        else if (minutes > 0) {
            return `${this.pad(minutes, 2)}:${this.pad(seconds % 60, 2)}`;
        }
        else {
            return `${this.pad(seconds, 2)}`;
        }
    }
    /**
     * @description Get random number with minimum and maximum limits
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * @description String to Discord line code format
     */
    lineCode(str) {
        return `\`${str}\``;
    }
    /**
     * @description Map urls into a markdown links.
     */
    mapUrls(urls) {
        return urls.map((url) => `[${this.stripUrl(url)}](${url})`).join(" ");
    }
    /**
     * @description Convert minutes into milliseconds.
     */
    minutesToMs(minutes) {
        return minutes * 60 * 1000;
    }
    /**
     * @description Convert milliseconds into seconds.
     */
    msToSeconds(ms) {
        return ms / 1000;
    }
    /**
     * @description Pad a string with a certain length.
     */
    pad(num, size) {
        let s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    }
    /**
     * @description Randomize a array.
     */
    randomArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    /**
     * @descriptionet Random integer between min and max, inclusive
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * @description Convert seconds into milliseconds.
     */
    secondsToMs(seconds) {
        return seconds * 1000;
    }
    /**
     * @description Strip HTML tags from a tag.
     */
    stripHtmlTags(str) {
        return str.replace(/<br\s*[\/]?>/gi, "\n").replace(/<[^>]*>/gi, "");
    }
    /**
     * @description Strip www and top level domain from a url.
     */
    stripUrl(url) {
        return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];
    }
    /**
     * @description Convert User ID into user mention.
     */
    toMention(id) {
        return `<@${id}>`;
    }
    /**
     * @description Trims a string to a certain length.
     */
    trimString(str, length) {
        return str.length > length ? str.substring(0, length) + "..." : str;
    }
    /**
     * @description Wait before fulfilling the promise.
     */
    wait(ms) {
        return promises_1.default.setTimeout(ms);
    }
}
exports.Utils = Utils;
