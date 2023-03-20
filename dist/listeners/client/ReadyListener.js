"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadyListener = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const time_utilities_1 = require("@sapphire/time-utilities");
const discord_js_1 = require("discord.js");
const mongoose_1 = __importDefault(require("mongoose"));
const libraries_1 = require("../../libraries");
let ReadyListener = class ReadyListener extends libraries_1.IListener {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const database = process.env.DATABASE_URL;
            const { logger, client } = this.container;
            logger.info(`Logged in as ${client.user.tag}`);
            const randomizePresence = () => {
                client.user.setPresence({
                    activities: [
                        {
                            name: this.utils.randomArray(libraries_1.Presences),
                            type: discord_js_1.ActivityType.Watching,
                        },
                    ],
                    status: "online",
                });
            };
            void randomizePresence();
            setInterval(randomizePresence, time_utilities_1.Time.Minute * 1);
            if (!database)
                return;
            try {
                mongoose_1.default.connect(database).then(() => {
                    logger.info(`${client.user.tag} already connected to the database.`);
                });
            }
            catch (_a) {
                logger.error("Failed to connect to database.");
            }
        });
    }
};
ReadyListener = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "Ready",
        once: false,
        event: framework_1.Events.ClientReady,
    })
], ReadyListener);
exports.ReadyListener = ReadyListener;
