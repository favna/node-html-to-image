"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_cluster_1 = require("puppeteer-cluster");
const screenshot_1 = __importDefault(require("./screenshot"));
/**
 * `node-html-to-image` takes a screenshot of the body tag's content.
 * @param options Options to pass to the generatorr
 */
function nodeHtmlToImage(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { html, content, output, puppeteerArgs = {} } = options;
        if (!html) {
            throw Error('You must provide an html property.');
        }
        const cluster = yield puppeteer_cluster_1.Cluster.launch({
            concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 2,
            puppeteerOptions: Object.assign(Object.assign({}, puppeteerArgs), { headless: true })
        });
        let buffers = [];
        yield cluster.task(({ page, data: { content, output } }) => __awaiter(this, void 0, void 0, function* () {
            const buffer = yield screenshot_1.default(page, Object.assign(Object.assign({}, options), { content, output }));
            buffers.push(buffer);
        }));
        const contents = Array.isArray(content) ? content : [Object.assign(Object.assign({}, (content !== null && content !== void 0 ? content : {})), { output })];
        for (const content of contents) {
            const { output } = content, pageContent = __rest(content, ["output"]);
            cluster.queue({ output, content: pageContent });
        }
        yield cluster.idle();
        yield cluster.close();
        return Array.isArray(content) ? buffers : buffers[0];
    });
}
// CommonJS and ESM exports for nodeHtmlToImage
exports.default = nodeHtmlToImage;
exports = nodeHtmlToImage;
module.exports = nodeHtmlToImage;
// Re-export options
__exportStar(require("./options"), exports);
//# sourceMappingURL=index.js.map