const { app, BrowserWindow } = require('electron');
const { is } = require('electron-util');

const config = require('./config')

let window

function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false
        }
    });

    if(is.development) {
        window.loadURL(config.LOCAL_WEB_URL);
    } else {
        window.loadURL(config.PRODUCTION_WEB_URL);
    }

    //window.loadFile('index.html');
    

    if(is.development) {
        window.webContents.openDevTools();
    }

    window.on('closed', () => {
        window = null;
    });
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});
app.on('activate', () => {
    if(window === null) {
        createWindow();
    }
})