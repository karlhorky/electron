/* global nodeProcess, isolatedWorld */

import type * as webViewElementModule from '@electron/internal/renderer/web-view/web-view-element';

process._linkedBinding = nodeProcess._linkedBinding;

const v8Util = process._linkedBinding('electron_common_v8_util');

const webViewImpl = v8Util.getHiddenValue(isolatedWorld, 'web-view-impl');

if (webViewImpl) {
  // Must setup the WebView element in main world.
  const { setupWebView } = require('@electron/internal/renderer/web-view/web-view-element') as typeof webViewElementModule;
  setupWebView(v8Util, webViewImpl as any);
}
