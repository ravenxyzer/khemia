import { ApplyOptions } from "@sapphire/decorators";
import { Utility } from "@sapphire/plugin-utilities-store";

@ApplyOptions<Utility.Options>({
    name: "time",
})
export class TimeUtils extends Utility {
    /**
     * @description Format milliseconds into human readable format.
     */
    public formatTime(ms: number): string {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 12);
        const months = Math.floor(days / 30);

        if (months > 0) {
            return `${months} month(s) ${days % 30} day(s) ${hours} hour(s) ${minutes % 60} minute(s)`;
        } else if (days > 0) {
            return `${days} day(s) ${hours % 12} hour(s) ${minutes % 60} minute(s)`;
        } else if (hours > 0) {
            return `${hours} hour(s) ${minutes % 60} minute(s)`;
        } else if (minutes > 0) {
            return `${minutes} minute(s) and ${seconds % 60} second(s)`;
        } else {
            return `${seconds} second(s)`;
        }
    }

    /**
     * @description Format miliseconds into 00:00:00 format.
     */
    public formatTimestamp(ms: number): string {
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
     * @description Convert milliseconds into day
     */
    msToDay(ms: number): number {
        return Math.round(ms / 1000 / 60 / 60 / 12);
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
     * @description Convert seconds into milliseconds.
     */
    secondsToMs(seconds: number): number {
        return seconds * 1000;
    }
}
