const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
if (process.argv.includes('--smoke-test')) {
  app.setPath('userData', path.join(app.getPath('temp'), 'kml-transit-journey-smoke'));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'KML Transit Journey',
    backgroundColor: '#202428',
    autoHideMenuBar: true,
    show: !process.argv.includes('--smoke-test'),
    webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.on('will-navigate', event => event.preventDefault());
  win.webContents.session.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
  win.webContents.session.setPermissionCheckHandler(() => false);
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
