/// <reference types="node" />
import type { Page } from 'puppeteer';
import { NodeHtmlToImageOptions } from './options';
declare function makeScreenshot(page: Page, { output, type, quality, encoding, content, html, transparent, waitUntil }: NodeHtmlToImageOptions): Promise<string | Buffer>;
export default makeScreenshot;
//# sourceMappingURL=screenshot.d.ts.map