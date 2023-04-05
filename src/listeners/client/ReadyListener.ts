import { Events } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Time } from "@sapphire/time-utilities";
import { ActivityType } from "discord.js";

import { Presences, Listener } from "../../libraries";

@ApplyOptions<Listener.Options>({
    name: "Ready",
    once: false,
    event: Events.ClientReady,
})
export class ReadyListener extends Listener {
    public async run(): Promise<void> {
        const { logger, client, utilities } = this.container;

        logger.info(`Logged in as ${client.user.tag}`);

        const randomizePresence = (): void => {
            client.user.setPresence({
                activities: [
                    {
                        name: utilities.funcs.randomArray(Presences),
                        type: ActivityType.Watching,
                    },
                ],
                status: "online",
            });
        };

        void randomizePresence();
        setInterval(randomizePresence, Time.Minute * 1);
    }
}
