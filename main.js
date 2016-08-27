const {app, BrowserWindow, Menu} = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 400, height: 320 });

    mainWindow.loadURL('file:///' + __dirname + '/index.html');

    mainWindow.on('closed', () => mainWindow = null);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
