import "dotenv/config";
import { Client } from "./libraries";

new Client().login(process.env.TOKEN);
