import "dotenv/config";
import "@sapphire/plugin-utilities-store/register";

import { Client } from "./libraries";

new Client().login(process.env.TOKEN);
