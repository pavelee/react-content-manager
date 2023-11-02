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
Object.defineProperty(exports, "__esModule", { value: true });
const readProps = (serailizedProps) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    return {
        title: (_a = serailizedProps === null || serailizedProps === void 0 ? void 0 : serailizedProps.title) !== null && _a !== void 0 ? _a : "domyślny tytuł",
        text: (_b = serailizedProps === null || serailizedProps === void 0 ? void 0 : serailizedProps.text) !== null && _b !== void 0 ? _b : "domyślny test",
        link: (_c = serailizedProps === null || serailizedProps === void 0 ? void 0 : serailizedProps.link) !== null && _c !== void 0 ? _c : "domyślny link",
    };
});
exports.default = readProps;
