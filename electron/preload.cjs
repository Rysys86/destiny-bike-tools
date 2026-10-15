// No Node APIs exposed to renderer — kept minimal for security
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('destinyBikeTools', {
  version: () => process.env.npm_package_version || '1.0.0',
  platform: () => process.platform,
});
