"use strict";
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
exports.createVoteLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const Vote_1 = require("../entities/Vote");
const createVoteLoader = () => new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    const votes = yield Vote_1.Vote.findByIds(keys);
    const idToVote = {};
    votes.forEach((v) => {
        idToVote[`${v.userId}|${v.postId}`] = v;
    });
    return keys.map((key) => idToVote[`${key.userId}|${key.postId}`]);
}));
exports.createVoteLoader = createVoteLoader;
//# sourceMappingURL=createVoteLoader.js.map