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
const handlebars_1 = __importDefault(require("handlebars"));
function makeScreenshot(page, { output, type, quality, encoding, content, html, transparent = false, waitUntil = 'networkidle0' }) {
    return __awaiter(this, void 0, void 0, function* () {
        let screenshotArgs = {};
        if (type === 'jpeg') {
            screenshotArgs.quality = quality !== null && quality !== void 0 ? quality : 80;
        }
        if (content) {
            const template = handlebars_1.default.compile(html);
            html = template(content);
        }
        yield page.setContent(html, { waitUntil });
        const element = yield page.$('body');
        const buffer = yield element.screenshot(Object.assign({ path: output, type, omitBackground: transparent, encoding }, screenshotArgs));
        return buffer;
    });
}
// CommonJS and ESM exports for the screenshot function
exports.default = makeScreenshot;
exports = makeScreenshot;
module.exports = makeScreenshot;
//# sourceMappingURL=screenshot.js.map