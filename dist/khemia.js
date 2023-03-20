"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const libraries_1 = require("./libraries");
new libraries_1.IClient().login(process.env.TOKEN);
