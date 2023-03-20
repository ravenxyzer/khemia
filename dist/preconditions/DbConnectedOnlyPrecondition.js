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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectedOnlyPrecondition = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const mongoose_1 = require("mongoose");
let DbConnectedOnlyPrecondition = class DbConnectedOnlyPrecondition extends framework_1.AllFlowsPrecondition {
    messageRun() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = mongoose_1.connection.readyState;
            return status === mongoose_1.ConnectionStates.connected
                ? this.ok()
                : this.error({
                    identifier: "preconditionDbConnectedOnly",
                });
        });
    }
    chatInputRun() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = mongoose_1.connection.readyState;
            return status === mongoose_1.ConnectionStates.connected
                ? this.ok()
                : this.error({
                    identifier: "preconditionDbConnectedOnly",
                });
        });
    }
    contextMenuRun() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = mongoose_1.connection.readyState;
            return status === mongoose_1.ConnectionStates.connected
                ? this.ok()
                : this.error({
                    identifier: "preconditionDbConnectedOnly",
                });
        });
    }
};
DbConnectedOnlyPrecondition = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "DbConnectedOnly",
    })
], DbConnectedOnlyPrecondition);
exports.DbConnectedOnlyPrecondition = DbConnectedOnlyPrecondition;
